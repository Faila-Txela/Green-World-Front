import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadArea from "../components/upload-area/single";
import PrimaryButton from "../components/ui/PrimaryButton";
import Textarea from "../components/ui/TextArea";
import Toast from "../components/ui/Toast";
import { relatarService } from "../modules/service/api/relatar";
import axios from "axios";
import { log } from "console";

interface RelatarFormData {
  descricao: string;
  latitude: string;
  longitude: string;
  userId: string;
}

export default function Relatos() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState<string>("");
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [provincia, setProvincia] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [formData, setFormData] = useState<RelatarFormData>({
    descricao: "",
    latitude: "",
    longitude: "",
    userId: ""
  });

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await axios.get("/provincia");
        console.log("Resposta da API", response.data);
        if (response.status === 200) {
          setProvincias(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar províncias", error);
      }
    };
    fetchProvincias();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "descricao") {
      setFormData({ ...formData, descricao: value });
    } else if (name === "userId") {
      setFormData({ ...formData, userId: value });
    }
  };

  const handleRelatar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.descricao || !provincia || !priority) {
      setToast({ message: "Preencha todos os campos", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await relatarService.create({ ...formData});
      if (response.status === 200) {
        setToast({ message: "Relato enviado com sucesso!", type: "success" });
        setTimeout(() => navigate("/terms"), 2000);
      }
    } catch (error) {
      setToast({ message: "Erro ao enviar o seu relato.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-12">
      <div className="flex flex-col items-center p-6 shadow-lg bg-white">
        <div className="flex flex-col bg-white w-full gap-2">
          <h2 className="text-3xl font-semibold text-green-800 mb-3">Relate um Amontoado de Lixo</h2>
          <p className="text-gray-700 text-sm mb-3 text-center">Ajude-nos a manter a cidade limpa. Preencha os campos abaixo para reportar um acúmulo de lixo.</p>
        </div>

        <form className="flex flex-col gap-6 mt-5 rounded-lg w-full" onSubmit={handleRelatar}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="provincia" className="block text-gray-600 font-semibold mb-2">Sua Provincia</label>
              <select
                name="provincia"
                className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                onChange={(e) => setProvincia(e.target.value)}
                aria-label="Selecione sua provincia"
              >
                <option value="">Selecione a provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>{provincia.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="block text-gray-600 font-semibold mb-2">Qual é a prioridade</label>
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
            <label htmlFor="descricao" className="text-body font-semibold text-gray-700 mb-2">
              Descrição do Acúmulo <b className="text-red-600">*</b>
            </label>
            <textarea
              id="descricao"
              name="descricao"
              placeholder="Ex: Em minha zona está em péssimo estado. O lixo está se acumulando há dias."
              className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="foto" className="text-body font-semibold text-gray-700 mb-2">
              Carregar Foto <b className="text-red-600">*</b>
            </label>
            <UploadArea />
          </div>

          <PrimaryButton name="Enviar Relato" addClassName="" disabled={loading} />
          <input type="reset" value="Limpar o Formulário" className="w-full p-3 text-[16px] text-white cursor-pointer font-medium rounded-[4px] active:scale-95 shadow-lg bg-global-color-three hover:bg-[#068a5b]" />
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>Após o envio, sua solicitação será processada e você receberá um feedback sobre a situação do seu relato.</p>
          <p className="mt-2 text-sm">Obrigado por ajudar a manter nossa cidade limpa!</p>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {loading && <div className="loader">Carregando...</div>}
    </div>
  );
}
