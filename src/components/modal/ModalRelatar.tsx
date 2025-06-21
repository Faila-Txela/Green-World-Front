import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import PrimaryButton from "../ui/PrimaryButton";
import TextArea from "../ui/TextArea";
import UploadArea from "../upload-area/single";
import { relatarService } from "../../modules/service/api/relatar";
import { validatorImagesService } from "../../modules/service/api/ImagesValidator";
import { LiaSpinnerSolid } from "react-icons/lia";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { format } from "date-fns";
import Confetti from 'react-confetti';

interface RelatarFormData {
  userId: string;
  descricao: string;
  latitude: string;
  longitude: string;
  provinciaId: string;
  municipioId: string;
  bairro: string;
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
  onRelatoSuccess: () => void;
  setToast: React.Dispatch<React.SetStateAction<{ message: string; type: "success" | "error" } | null>>;
}

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  extraPaddingRight = false,
  required = false
}: {
  label: string;
  type: string;
  name: keyof RelatarFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extraPaddingRight?: boolean;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-600 font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
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

export default function ModalRelatar({ closeModal, setToast, onRelatoSuccess }: ModalRelatarProps) {
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
  const [pontos, setPontos] = useState<number>(0);
  const [imagens, setImagens] = useState<File[] | null>(null);
  const [isImageValid, setIsImageValid] = useState<boolean | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [submittedRelato, setSubmittedRelato] = useState<null | {
    descricao: string;
    dataHora: string;
  }>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const isFormValid = Boolean(
    formData.descricao.trim() &&
    formData.latitude &&
    formData.longitude &&
    provincia &&
    municipio &&
    formData.bairro.trim() &&
    prioridade &&
    imagens !== null &&
    isImageValid &&
    !isImageLoading
  );

  const isFieldInvalid = (fieldName: string, value: string) => 
    touchedFields[fieldName] && !value.trim();

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
    
    if (!touchedFields[name]) {
      setTouchedFields(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const { value } = e.target;
    setter(value);
    
    const fieldName = e.target.title;
    if (!touchedFields[fieldName]) {
      setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    }
  };

  const handleImageValidation = async (file: File) => {
    setIsImageLoading(true);
    setIsImageValid(null);
    setToast(null);
  
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const result = await validatorImagesService.create(formData);
      const conceitos = result.data?.conceitos || [];

      const lixoDetectado = conceitos.some((c: any) =>
        ["garbage", "trash", "rubbish", "pollution", "waste", "recycling", "dirty", "messy", "pile", "landfill", "litter", "junk", "enviroment", "dust", "plastic", "glass", "dump", "industry"].includes(c.name.toLowerCase())
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
    
    if (!touchedFields.latitude) {
      setTouchedFields(prev => ({ ...prev, latitude: true, longitude: true }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isFormValid) {
      const allFields = {
        descricao: true,
        provincia: true,
        municipio: true,
        bairro: true,
        prioridade: true,
        latitude: true,
        longitude: true
      };
      setTouchedFields(allFields);

      // Validação dos campos de "bairro" e "descrição"
      const descricao = formData.descricao.trim();
      const bairro = formData.bairro.trim();

      if (!/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/.test(descricao)) {
      setToast({ message: "A descrição deve conter apenas letras e não pode ter espaços em excesso!", type: "error" });
      return;
      }

      if (!/^[A-Za-zÀ-ÿ0-9]+(?: [A-Za-zÀ-ÿ0-9]+)*$/.test(bairro)) {
      setToast({ message: "O bairro não pode ter espaços em excesso e símbolos!", type: "error" });
      return;
      }
      
      return setToast({ 
        message: "Preencha todos os campos corretamente.", 
        type: "error" 
      });
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
      payload.append("bairro", formData.bairro);
      payload.append("prioridade", prioridade);
      payload.append("image", imagens![0]); 
  
      const res = await relatarService.create(payload);
  
      if (res.status === 201) {
        setSubmittedRelato({
          descricao: formData.descricao,
          dataHora: format(new Date(), "dd/MM/yyyy HH:mm"),
        });
        
        setShowConfetti(true);
        setToast({ message: "Relato enviado com sucesso!", type: "success" });
        onRelatoSuccess();
        
        setTimeout(() => {
          setShowConfetti(false);
          closeModal();
        }, 6000);
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

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if(userId){
      axios.get(`/pontos/${userId}`).then(res => {
        setPontos(res.data.pontos);
      }).catch(() => {
        setPontos(0);
      });
    }
   }, []);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={250}
          gravity={0.7}
        />
      )}

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
            <div>
              <label htmlFor="Descrição" className="block text-gray-700 font-semibold">
                Descrição <span className="text-red-500">*</span></label>
              <TextArea
                name="descricao"
                id="descricao"
                placeholder="Descreva o problema..."
                value={formData.descricao}
                onChange={handleChange}
              />
              {isFieldInvalid("descricao", formData.descricao) && (
                <p className="text-red-500 text-sm mt-1">Por favor, descreva o problema</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Província <span className="text-red-500">*</span>
              </label>
              <select 
                className={`w-full p-3 border rounded-md cursor-pointer ${isFieldInvalid("provincia", provincia) ? "border-red-500" : ""}`}
                title="provincia" 
                value={provincia}
                onChange={(e) => handleSelectChange(e, setProvincia)}
              >
                <option value="">Selecione a Província</option>
                {provincias.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
              {isFieldInvalid("provincia", provincia) && (
                <p className="text-red-500 text-sm mt-1">Selecione uma província</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Município <span className="text-red-500">*</span>
              </label>
              <select 
                className={`w-full p-3 border rounded-md cursor-pointer ${isFieldInvalid("municipio", municipio) ? "border-red-500" : ""}`}
                title="municipio" 
                value={municipio}
                onChange={(e) => handleSelectChange(e, setMunicipio)}
                disabled={!provincia}
              >
                <option value="">Selecione o Município</option>
                {municipios.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>
              {isFieldInvalid("municipio", municipio) && (
                <p className="text-red-500 text-sm mt-1">Selecione um município</p>
              )}
            </div>

            <div>
              <InputField 
                label="Bairro" 
                type="text" 
                name="bairro" 
                value={formData.bairro} 
                onChange={handleChange}
                required={true}
              />
              {isFieldInvalid("bairro", formData.bairro) && (
                <p className="text-red-500 text-sm mt-1">Por favor, informe o bairro</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Prioridade <span className="text-red-500">*</span>
              </label>
              <select 
                className={`w-full p-3 border rounded-md cursor-pointer ${isFieldInvalid("prioridade", prioridade) ? "border-red-500" : ""}`}
                title="prioridade" 
                value={prioridade}
                onChange={(e) => handleSelectChange(e, setPrioridade)}
              >
                <option value="">Selecione a Prioridade</option>
                <option value="BAIXA">Baixa</option>
                <option value="ALTA">Alta</option>
              </select>
              {isFieldInvalid("prioridade", prioridade) && (
                <p className="text-red-500 text-sm mt-1">Selecione uma prioridade</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Foto do amontoado <span className="text-red-500">*</span>
              </label>
              <UploadArea onChange={handleImageValidation} />
              {isImageLoading && (
                <p className="text-green-600 text-sm mt-1 flex gap-2">Validando imagem... <LiaSpinnerSolid size={24} color="" className="animate-spin" /></p>
              )}
              {isImageValid === false && (
                <p className="text-red-500 text-sm mt-1">A imagem enviada não parece conter lixo. Tente outra.</p>
              )}
              {touchedFields.latitude && !formData.latitude && (
                <p className="text-red-500 text-sm mt-1">Selecione um local no mapa</p>
              )}
            </div>

            {locationDenied && (
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">
                  Localização <span className="text-red-500">*</span>
                </label>
                <p className="mb-2 text-sm text-gray-600">Clique no mapa para selecionar o local:</p>
                <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                  <MapContainer 
                    center={[-8.8383, 13.2344]} 
                    zoom={14} 
                    className="h-full w-full"
                    style={{ minHeight: '198px' }}
                  >
                    <TileLayer 
                      className="cursor-pointer"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                {(!formData.latitude || !formData.longitude) && touchedFields.latitude && (
                  <p className="text-red-500 text-sm mt-1">Por favor, selecione um local no mapa</p>
                )}
              </div>
            )}

            <PrimaryButton
              name={loading ? "Enviando..." : "Enviar Relato"}
              addClassName={`w-full ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isFormValid || loading}
            />

            <PrimaryButton
              name="Fechar"
              addClassName="bg-gray-300 text-black hover:bg-gray-400"
              onClick={() => !loading && closeModal()}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </>
  );
}