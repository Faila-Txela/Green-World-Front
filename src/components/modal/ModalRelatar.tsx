import { useState } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import TextArea from "../ui/TextArea";
import UploadArea from "../upload-area/single";
import { relatarService } from "../../modules/service/api/relatar";

interface ModalRelatarProps {
  closeModal: () => void;
  setToast: React.Dispatch<React.SetStateAction<{ message: string; type: "success" | "error" } | null>>;
}

export default function ModalRelatar({ closeModal, setToast }: ModalRelatarProps) {
  const [formData, setFormData] = useState({
    descricao: "",
    latitude: "",
    longitude: "",
    provinciaId: "",
    municipioId: "",
  });

  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);  
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [provincia, setProvincia] = useState<string>("");
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipio, setMunicipio] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.descricao.trim()) {
      setToast({ message: "A descrição é obrigatória!", type: "error" });
      return;
    }

    if (!formData.provinciaId.trim()) {
        setToast({ message: "A seleção da província é obrigatória!", type: "error" });
        return;
      }

    if (!formData.municipioId.trim()) {
        setToast({ message: "A seleção do município é obrigatória!", type: "error" });
        return;
      }

    setLoading(true);

    try {
      const response = await relatarService.create({ ...formData, userId: "exampleUserId" });
      if (response.status === 201) {
        setToast({ message: "Relato enviado com sucesso!", type: "success" });
        closeModal();
      }
    } catch (error) {
      setToast({ message: "Erro ao enviar o relato", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center mt-16">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl text-green-700 mb-4">Relatar Novo Amontoado</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
          {/* Primeira parte: Descrição, Província, e Município */}
          <div className="flex flex-col space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Descrição do Acúmulo</label>
              <TextArea
                id="descricao"
                name="descricao"
                placeholder="Ex: Lixo acumulado na rua..."
                value={formData.descricao}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="provincia"
                className="block text-gray-600 font-semibold mb-2"
              >
                Província
              </label>
              <select
                className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                onChange={(e) => setProvincia(e.target.value)}
                aria-label="Selecione a província"
              >
                <option value="">Selecione a província</option>
                {/* Mapear as províncias */}
              </select>
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
                <option value="">Selecione o município</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Segunda parte: Prioridade e Foto */}
          <div className="flex flex-col space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Prioridade</label>
              <select
                title="Prioridade"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none"
              >
                <option value="">Selecione a Prioridade</option>
                <option value="BAIXA">Baixa</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Carregar Foto</label>
              <UploadArea />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <PrimaryButton name={loading ? "Enviando..." : "Enviar Relato"} addClassName="w-full" />
            <button
              type="button"
              onClick={closeModal}
              className="w-full md:w-1/4 p-3 bg-gray-300 font-semibold text-black hover:bg-gray-400 rounded-md"
              style={{ transition: ".2s ease-in-out" }}
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

