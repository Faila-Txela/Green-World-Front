import { useEffect, useState } from "react";
import  axios from '../../lib/axios'
import PrimaryButton from "../ui/PrimaryButton";
import TextArea from "../ui/TextArea";
import UploadArea from "../upload-area/single";
import { relatarService } from "../../modules/service/api/relatar";
import MapComponent from "../../components/Map";
import { validatorImagesService } from '../../modules/service/api/ImagesValidator/validateImages'
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

interface RelatarFormData {
  descricao: string;
  latitude: string;
  longitude: string;
  provinciaId: string;
  municipioId: string;
  bairro?: string;
  prioridade: string;
  analiseImagem: File | null;
}

interface Provincia {
  id: string;
  nome: string;
}

interface Municipio {
  id: string;
  nome: string;
}

interface ModalRelatarProps {
  closeModal: () => void;
  setToast: React.Dispatch<React.SetStateAction<{ message: string; type: "success" | "error" } | null>>;
}

const InputField = ({
  label, type, name, value, onChange, extraPaddingRight = false
}: {
  label: string;
  type: string;
  name: keyof RelatarFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //icon: JSX.Element;
  extraPaddingRight?: boolean;
}) => (
  <div className="relative">
    <label htmlFor={name} className="block text-gray-600 font-semibold mb-2">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={`Digite o ${label.toLowerCase()}`}
        className={`w-full p-3 ${extraPaddingRight ? "pr-10" : "pr-3"} pl-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700`}
      />
    </div>
  </div>
);

function LocationSelector({ setCoords }: { setCoords: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      setCoords(e.latlng.lat, e.latlng.lng);
      console.log(setCoords)
    },
  });
  return null;
}

export default function ModalRelatar({ closeModal, setToast }: ModalRelatarProps) {
  const [formData, setFormData] = useState<RelatarFormData>({
    descricao: "",
    latitude: "",
    longitude: "",
    provinciaId: "",
    municipioId: "",
    bairro: "",
    prioridade: "",
    analiseImagem: null,
  });

  const [imagens, setImagens] = useState<File[] | null>(null);
  const [isImageValid, setIsImageValid] = useState<boolean | null>(null);
  const [prioridade, setPrioridade] = useState("");
  const [loading, setLoading] = useState(false);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [provincia, setProvincia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);

  const isFormValid =
  formData.descricao.trim() &&
  formData.latitude &&
  formData.longitude &&
  provincia &&
  municipio &&
  prioridade &&
  imagens !== null && isImageValid;

  const fetchProvincias = async () => {
    const res = await axios.get("/provincia");
    //console.log(res)
    if (res.status === 200) setProvincias(res.data);
  };

  const fetchMunicipios = async (id: string) => {
    const res = await axios.get(`/municipio/provincia/${id}`);
    if (res.status === 200) setMunicipios(res.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageValidation = async (file: File) => {
    // Chama o serviço de validação da imagem
    const result = await validatorImagesService.create({
      imageURL: file,
      labels: [],
      analysisDate: new Date(),
      amontoadoRelatadoId: "",
      status: "pendente",
    });
  
    const isValid = result.data.isValid;
    setIsImageValid(isValid);
    setImagens((prev) => (prev ? [...prev, file] : [file]));
  };

  const setCoords = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.descricao.trim()) return setToast({ message: "Descrição obrigatória", type: "error" });
    if (!provincia) return setToast({ message: "Selecione a província", type: "error" });
    if (!municipio) return setToast({ message: "Selecione o município", type: "error" });
    if (imagens === null || !isImageValid) return setToast({ message: "As imagens não são válidas ou não foram enviadas corretamente", type: "error" });

    setLoading(true);
    try {
      if (!imagens || !(imagens[0] instanceof File)) {
        return setToast({ message: "Imagem inválida ou não enviada", type: "error" });
      }

      const payload = {
        ...formData,
        userId: "exampleUserId",
        provinciaId: provincia,
        municipioId: municipio,
        prioridade: formData.prioridade,
        analiseImagem: imagens[0],
      };
      const res = await relatarService.create(payload);
      if (res.status === 201) {
        setToast({ message: "Relato enviado com sucesso!", type: "success" });
        closeModal();
      }
    } catch (err) {
      setToast({ message: "Erro ao enviar relato", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvincias();
  }, []) ;

  useEffect(() => {
    if (provincia) fetchMunicipios(provincia);
  }, [provincia]);

  // Geolocalização automática
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          setLocationDenied(true);
        }
      );
    } else {
      setLocationDenied(true);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center  z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl text-green-700 mb-7 text-center">Relatar Novo Amontoado</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10">
          <div className="flex flex-col gap-6 w-full">
            <label htmlFor="descricao" className="block text-gray-700 font-semibold">Descrição</label>
            <TextArea name="descricao" id="descricao" placeholder="Ex: Ex: Lixo acumulado na rua..." value={formData.descricao} onChange={handleChange} className="" />

            <div>
              <label htmlFor="provincia" className="block text-gray-700 font-semibold">Província</label>
              <select className="w-full p-3 border rounded-md" title="provincia" onChange={(e) => setProvincia(e.target.value)}>
                <option value="">Selecione a Província</option>
                {provincias.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="municipio" className="block text-gray-700 font-semibold">Município</label>
              <select className="w-full p-3 border rounded-md" title="municipio" onChange={(e) => setMunicipio(e.target.value)}>
                <option value="">Selecione o Município</option>
                {municipios.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>
            </div>

            <InputField
              label="Bairro (opcional)"
              type="text"
              name="bairro"
              value={formData.bairro || ""}
              onChange={handleChange}
            />

            <div>
              <label htmlFor="prioridade" className="block text-gray-700 font-semibold">Prioridade</label>
              <select className="w-full p-3 border rounded-md" title="Selecione a prioridade" value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                <option value="">Selecione a Prioridade</option>
                <option value="BAIXA">Baixa</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

           <div>
           <label htmlFor="imagens" className="block text-gray-700 font-semibold">Carregar Imagem</label>
           <UploadArea onChange={handleImageValidation} />
           </div>

            {locationDenied && (
              <div className="flex flex-col">
                <p className="mb-2 font-semibold">Selecione sua localização no mapa:</p>
                <MapContainer
                  center={[-8.8383, 13.2344]}
                  zoom={13}
                  
                  style={{ height: "10px", width: "40%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <LocationSelector setCoords={setCoords} />
                  {formData.latitude && formData.longitude && (
                    <Marker
                      position={[parseFloat(formData.latitude), parseFloat(formData.longitude)]}
                      icon={L.icon({
                        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })}
                    />
                  )}
                </MapContainer>
              </div>
            )}
            </div>

          <div className="grid gap-4 w-full">
            <PrimaryButton name={loading ? "Enviando..." : "Enviar Relato"} addClassName="px-36" disabled={!isFormValid || loading} />
            <PrimaryButton name="Fechar" addClassName="bg-gray-300 text-black hover:bg-gray-400" onClick={closeModal} />
          </div>

        </form>

      </div>
    </div>
  );
}