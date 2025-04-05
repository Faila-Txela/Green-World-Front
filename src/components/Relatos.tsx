import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadArea from "../components/upload-area/single";
import PrimaryButton from "../components/ui/PrimaryButton";
import Toast from "../components/ui/Toast";
import TextArea from "./ui/TextArea";
import { relatarService } from "../modules/service/api/relatar";
import axios from "axios";

interface RelatarFormData {
  descricao: string;
  latitude: string;
  longitude: string;
  userId: string;
  provinciaId: string;
  municipioId: string;
}

export default function Relatos() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState<string>("");
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [provincia, setProvincia] = useState<string>("");
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipio, setMunicipio] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const [formData, setFormData] = useState<RelatarFormData>({
    descricao: "",
    latitude: "",
    longitude: "",
    provinciaId: "",
    municipioId: "",
    userId: "",
  });

  const fetchProvincias = async () => {
      const response = await axios.get("/provincia");
      console.log(response)
      if (response.status === 200) {
        setProvincias(response.data);
      }
    };

  const fetchMunicipio = async (id: string) => {
    const response = await axios.get(`/municipio/provincia/${id}`);
    //console.log(response.data);
    if (response.status === 200) {
      setMunicipios(response.data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Dados enviados:", formData);
    setToast({ message: "Relato feito com sucesso!", type: "success" });

    // Validações
    if (!formData.descricao.trim()) {
      setToast({
        message: "A descrição do amontoado é obrigatória!",
        type: "error",
      });
      return;
    }

    if (!provincia) {
      setToast({ message: "Selecione uma província!", type: "error" });
      return;
    }

    if (!municipio) {
      setToast({ message: "Selecione um município!", type: "error" });
      return;
    }

    try {
      const relatarData = {
        ...formData,
      };

      const response = await relatarService.create({
        userId: relatarData.userId,
        latitude: relatarData.latitude,
        longitude: relatarData.longitude,
        descricao: relatarData.descricao,
        provinciaId: provincia,
        municipioId: municipio,
      });

      console.log("Resposta do servidor:", response);

      if (response.status === 201) {
        setTimeout(() => navigate("/terms"), 2000);
      }
    } catch (error) {
      console.log("❌ Erro ao enviar o seu relato:", error);
      setToast({ message: "❌ Erro ao enviar o seu relato", type: "error" });
    }
  };

  useEffect(() => {
    fetchProvincias();
  }, []);

  useEffect(() => {
    if (provincia.trim() === "") return setMunicipios([]);

    fetchMunicipio(provincia);
  }, [provincia]);

  return (
    <div className="flex justify-center p-12">
      <div className="flex flex-col items-center p-6 shadow-lg bg-white">
        <div className="flex flex-col bg-white w-full gap-2">
          <h2 className="text-3xl font-semibold text-green-800 mb-3">
            Relate um Amontoado de Lixo
          </h2>
          <p className="text-gray-700 text-sm mb-3 text-center">
            Ajude-nos a manter a cidade limpa. Preencha os campos abaixo para
            reportar um acúmulo de lixo.
          </p>
        </div>

        <form
          className="flex flex-col gap-6 mt-5 rounded-lg w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="provincia"
                className="block text-gray-600 font-semibold mb-2"
              >
                Provincia
              </label>
              <select
                className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                onChange={(e) => setProvincia(e.target.value)}
                aria-label="Selecione a provincia"
              >
                <option value="">Selecione a provincia</option>
                
                
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="municipio"
              className="block text-gray-600 font-semibold mb-2"
            >
              Município
            </label>
            <select
              name="municipio"
              className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              onChange={(e) => setMunicipio(e.target.value)}
              aria-label="Selecione o município"
            >
              <option value="">Selecione o munícípio</option>
              {municipios.map((municipio) => (
                <option key={municipio.id} value={municipio.id}>
                  {municipio.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-gray-600 font-semibold mb-2"
            >
              Qual é a prioridade
            </label>
            <select
              name="priority"
              className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Selecione a prioridade"
            >
              <option value="">Selecione a prioridade</option>
              <option value="BAIXA">Baixa</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="text-body font-semibold text-gray-700 mb-2"
            >
              Descrição do Acúmulo <b className="text-red-600">*</b>
            </label>
            <TextArea
              id="descricao"
              name="descricao"
              placeholder="Ex: Em minha zona está em péssimo estado. O lixo está se acumulado há dias."
              value={formData.descricao}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="foto"
              className="text-body font-semibold text-gray-700 mb-2"
            >
              Carregar Foto <b className="text-red-600">*</b>
            </label>
            <UploadArea />
          </div>

          <PrimaryButton name="Enviar Relato" addClassName="" />
          <input
            type="reset"
            value="Limpar o Formulário"
            className="w-full p-3 text-[16px] text-white cursor-pointer font-medium rounded-[4px] active:scale-95 shadow-lg bg-global-color-three hover:bg-[#068a5b]"
          />
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>
            Após o envio, sua solicitação será processada e você receberá um
            feedback sobre a situação do seu relato.
          </p>
          <p className="mt-2 text-sm">
            Obrigado por ajudar a manter nossa cidade limpa!
          </p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
