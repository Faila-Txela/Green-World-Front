import { useState, useEffect } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Toast from "../components/ui/Toast";
import { relatarService } from "../modules/service/api/relatar";
import ModalRelatar from "../components/modal/ModalRelatar"; // Novo componente do modal

export default function Relatos() {
  const [relatos, setRelatos] = useState<any[]>([]); // Array de relatos do usuário
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRelatos = async () => {
    // A função para buscar os relatos do usuário
        const response = await relatarService.getAll();
        setRelatos(response.data);
    try {
      const data = await relatarService.getAll();
      setRelatos(data.data);
    } catch (error) {
      console.error("Erro ao buscar relatos", error);
    }
  };

  useEffect(() => {
    fetchRelatos();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center p-12 mt-12">
      <div className="flex flex-col items-center p-6 shadow-lg bg-white w-full max-w-xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-green-800 mb-3">Meus Relatos</h2>
          <p className="text-gray-700 text-sm mb-3">Acompanhe o status dos seus relatos e relate novos casos.</p>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-xl text-green-700">Relatos Recentes</h3>
          <ul>
            {relatos.map((relato, index) => (
              <li key={index} className="flex justify-between p-3 border-b">
                <span>{relato.descricao}</span>
                <span className="text-sm text-gray-500">{relato.data}</span>
              </li>
            ))}
          </ul>
        </div>

        <PrimaryButton name="Relatar Novo Amontoado" onClick={openModal} addClassName="w-full mb-4" />

        <div className="text-center text-gray-600 mt-6">
          <p>Obrigado por nos ajudar a manter a cidade limpa!</p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {isModalOpen && <ModalRelatar closeModal={closeModal} setToast={setToast} />}
    </div>
  );
}