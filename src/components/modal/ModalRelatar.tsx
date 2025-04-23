import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import PrimaryButton from "../ui/PrimaryButton";
import TextArea from "../ui/TextArea";
import UploadArea from "../upload-area/single";
import { relatarService } from "../../modules/service/api/relatar";
import { validatorImagesService } from "../../modules/service/api/ImagesValidator";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { format } from "date-fns";

interface RelatarFormData {
  userId: string;
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
  label,
  type,
  name,
  value,
  onChange,
  extraPaddingRight = false,
}: {
  label: string;
  type: string;
  name: keyof RelatarFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extraPaddingRight?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-600 font-semibold mb-2">
      {label}
    </label>
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
);

function LocationSelector({ setCoords }: { setCoords: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      setCoords(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function ModalRelatar({ closeModal, setToast }: ModalRelatarProps) {
  const [formData, setFormData] = useState<RelatarFormData>({
    userId: "", 
    descricao: "",
    latitude: "",
    longitude: "",
    provinciaId: "",
    municipioId: "",
    bairro: "",
    prioridade: "",
    analiseImagem: null,
  });

  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [provincia, setProvincia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [imagens, setImagens] = useState<File[] | null>(null);
  const [isImageValid, setIsImageValid] = useState<boolean | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [submittedRelato, setSubmittedRelato] = useState<null | {
    descricao: string;
    dataHora: string;
  }>(null);

  const isFormValid =
    formData.descricao.trim() &&
    formData.latitude &&
    formData.longitude &&
    provincia &&
    municipio &&
    prioridade &&
    imagens !== null &&
    isImageValid &&
    !isImageLoading;

  const fetchProvincias = async () => {
    const res = await axios.get("/provincia");
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
    setIsImageLoading(true);
    setIsImageValid(null);
    setToast(null);
  
    try {
      const formData = new FormData();
      formData.append("image", file); 
      //formData.append("amontoadoRelatadoId", amontoadoRelatadoId)
  
      const result = await validatorImagesService.create(formData);
      console.log(result);
      const conceitos = result.data?.conceitos || []; // Ajuste conforme a estrutura da resposta

      const lixoDetectado = conceitos.some((c: any) =>
        ["garbage", "trash", "rubbish", "pollution", "waste", "recycling", "dirty", "messy", "pile", "landfill", "litter"].includes(c.name.toLowerCase())
      );
  
      setIsImageValid(lixoDetectado);
      setImagens([file]);
  
      if (!lixoDetectado) {
        setToast({ message: "A imagem não parece conter lixo. Tente outra.", type: "error" });
      }
    } catch (erro) {
      console.error("Erro ao validar a imagem:", erro);
      setToast({ message: "Erro ao validar a imagem.", type: "error" });
    } finally {
      setIsImageLoading(false);
    }
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
  
    if (!isFormValid) {
      return setToast({ message: "Preencha todos os campos obrigatórios e envie uma imagem válida.", type: "error" });
    }
  
    setLoading(true);
  
    try {
      const payload = new FormData();
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      payload.append("userId", parsedUser?.id || "");
      payload.append("descricao", formData.descricao);
      payload.append("latitude", formData.latitude);
      payload.append("longitude", formData.longitude);
      payload.append("provinciaId", provincia);
      payload.append("municipioId", municipio);
      payload.append("bairro", formData.bairro || "");
      payload.append("prioridade", prioridade);
      payload.append("image", imagens![0]); // Certifique-se de que o nome do campo é "image"
  
      const res = await relatarService.create(payload);
  
      if (res.status === 201) {
        setSubmittedRelato({
          descricao: formData.descricao,
          dataHora: format(new Date(), "dd/MM/yyyy HH:mm"),
        });
  
        setToast({ message: "Relato enviado com sucesso!", type: "success" });
        setTimeout(() => closeModal(), 1500);
      }
    } catch (erro) {
      console.error("Erro ao enviar relato:", erro);
      setToast({ message: "Erro ao enviar relato", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvincias();
  }, []);

  useEffect(() => {
    if (provincia) fetchMunicipios(provincia);
  }, [provincia]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords(pos.coords.latitude, pos.coords.longitude),
        () => setLocationDenied(true)
      );
    } else {
      setLocationDenied(true);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {submittedRelato && (
          <div className="bg-green-100 p-4 border border-green-400 rounded mb-4">
            <p><strong>Relato enviado:</strong> {submittedRelato.descricao}</p>
            <p className="text-sm text-gray-600">Enviado em: {submittedRelato.dataHora}</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Relatar Novo Amontoado</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextArea
            name="descricao"
            id="descricao"
            placeholder="Descreva o problema..."
            value={formData.descricao}
            onChange={handleChange}
          />

          <div>
            <label className="block text-gray-700 font-semibold">Província</label>
            <select className="w-full p-3 border rounded-md" title="provincia" onChange={(e) => setProvincia(e.target.value)}>
              <option value="">Selecione a Província</option>
              {provincias.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Município</label>
            <select className="w-full p-3 border rounded-md" title="municipio" onChange={(e) => setMunicipio(e.target.value)}>
              <option value="">Selecione o Município</option>
              {municipios.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
            </select>
          </div>

          <InputField label="Bairro (opcional)" type="text" name="bairro" value={formData.bairro || ""} onChange={handleChange} />

          <div>
            <label className="block text-gray-700 font-semibold">Prioridade</label>
            <select className="w-full p-3 border rounded-md" title="prioridade" value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
              <option value="">Selecione a Prioridade</option>
              <option value="BAIXA">Baixa</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          <UploadArea onChange={handleImageValidation} />

          {isImageLoading && (
            <p className="text-green-600 text-sm">Validando imagem... <span className="animate-pulse">⏳</span></p>
          )}

          {isImageValid === false && (
            <p className="text-red-500 text-sm">A imagem enviada não parece conter lixo. Tente outra.</p>
          )}

          {locationDenied && (
            <div>
              <p className="mb-2 font-medium">Clique no mapa para selecionar o local:</p>
              <MapContainer center={[-8.8383, 13.2344]} zoom={12} style={{ height: "30px", width: "60%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

          <PrimaryButton
            name={loading ? "Enviando..." : "Enviar Relato"}
            addClassName="w-full"
            disabled={!isFormValid || loading}
          />

          <PrimaryButton
            name="Fechar"
            addClassName="bg-gray-300 text-black hover:bg-gray-400"
            onClick={() => !loading && closeModal()}
          />
        </form>
      </div>
    </div>
  );
}