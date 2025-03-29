import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadArea from "../components/upload-area/single";
import PrimaryButton from "../components/ui/PrimaryButton";
import Textarea from "../components/ui/TextArea";
import Toast from "../components/ui/Toast";
import { relatarService } from "../modules/service/api/relatar";
import axios from "axios";


interface RelatarFormData {
  descricao: string;
  latitude: string;
  longitude: string;
  userId: string;
}

export default function Relatos() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState<string>();
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [provincia, setProvincia] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [formData, setFormData] = useState<RelatarFormData>({
    descricao: "",
    latitude: "",
    longitude: "",
    userId: ""
  });

  const fetchProvincias = async () => {
    const response = await axios.get("/provincia");
    if (response.status === 200) {
      setProvincias(response.data);
    }
  };

  const handleRelatar = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Relato feito com sucesso",formData)
    try {
      const relatarData = {
        ...formData,
      };

      const response = await relatarService.create({ descricao: relatarData.descricao, latitude: relatarData.latitude, longitude: relatarData.longitude, userId: relatarData.userId });
      console.log("Resposta do servidor", response);
      if (response.status === 200) {
        setTimeout(() => navigate("/terms"), 2000);
      }
    } catch (error) {
      console.log("Erro ao enviar os seus dados para análise", error);
    }
  };
  
     useEffect(() => {
       fetchProvincias();
     }, []);

  return (
    <div className="flex justify-center p-12">

      {/* Conteúdo */}
        <div className="flex flex-col justify-center items-center p-6 shadow-lg bg-white">
          {/* Cabeçalho */}
        <div className="flex flex-col bg-white p-12 rounded-lg w-full max-w-lg gap-2">
        <h2 className="text-3xl font-semibold text-green-800 mb-3">Relate um Amontoado de Lixo</h2>
        <p className="text-gray-700 text-sm mb-3 text-center">Ajude-nos a manter nossa cidade limpa. Preencha os campos abaixo para reportar um acúmulo de lixo.</p>
        <p className="text-gray-700 text-sm text-center"><b className="text-red-700">*</b> Campos obrigatórios</p>
      </div>

      {/* Formulário */}
      <form className="flex flex-col gap-6 mt-5 rounded-lg w-full" >

        {/* Localidade */}
        <div className="grid grid-cols-2 gap-4">
        <div>
            <label
              htmlFor="provincia"
              className="block text-gray-600 font-semibold mb-2"
            >
              Sua Provincia
            </label>
            <select
              className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              onChange={(e) => setProvincia(e.target.value)}
              aria-label="Selecione sua provincia"
            >
              <option className="" key="" value="">Selecione a provincia</option>
              {provincias.map((provincia) => (
                <option value={provincia.id}>{provincia.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Prioridade */}
        <div>
            <label
              htmlFor="provincia"
              className="block text-gray-600 font-semibold mb-2"
            >
              Qual é a prioridade
            </label>
            <select
              className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Selecione a prioridade"
            >
              <option className="" key="" value="">Selecione a prioridade</option>
                <option value="BAIXA">Baixa</option>
                <option value="ALTA">Alta</option>
            </select>
          </div>

        {/* Descrição */}
        <div>
          <label
            htmlFor="descricao"
            className="text-body font-semibold text-gray-700 mb-2"
          >
            Descrição do Acúmulo <b className="text-red-600">*</b>
          </label>
          <Textarea
            id="descricao"
            placeholder="Ex: Em minha zona está em péssimo estado. O lixo está se acumulando há dias."
            className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Upload de Foto */}
        <div>
          <label
            htmlFor="foto"
            className="text-body font-semibold text-gray-700 mb-2"
          >
            Carregar Foto <b className="text-red-600">*</b>
          </label>
          <UploadArea />
        </div>

        {/* Botão de Envio */}
          <PrimaryButton name="Enviar Relato" addClassName="" />
      </form>

      {/* Feedback interativo */}
      <div className="mt-6 text-center text-gray-600">
        <p>Após o envio, sua solicitação será processada e você receberá um feedback sobre a situação do seu relato.</p>
        <p className="mt-2 text-sm">Obrigado por ajudar a manter nossa cidade limpa!</p>
      </div>
      </div>

       {/* Exibe o Toast se houver mensagem */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

    </div>
  );
}
