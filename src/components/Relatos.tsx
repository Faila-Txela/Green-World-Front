import { useState, useEffect } from "react";
import { MdOutlineReport } from "react-icons/md";
import PrimaryButton from "../components/ui/PrimaryButton";
import Toast from "../components/ui/Toast";
import { relatarService } from "../modules/service/api/relatar";
import ModalRelatar from "../components/modal/ModalRelatar";

export default function Relatos() {
  

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


   // A função para buscar os relatos do usuário
  //  const fetchRelatos = async () => {
  //   try {
  //     const response = await relatarService.getAll();
  //    const data = response.data
  //     // Verifica se é array antes de setar
  //       console.error("Resposta da API:", response);
  //       if (Array.isArray(data)) {
  //         setRelatos(data);
  //       } else {
  //         console.error("Resposta não é um array:", data);
  //         setRelatos([]); // Prevê erro e evita crash no .map()
  //       }
  //   } catch (error) {
  //     console.error("Erro ao buscar relatos", error);
  //     setToast({ message: "Erro ao pesquisar os relatos", type: "error" });
  //   }
  // };

  //  useEffect(() => {
  //    fetchRelatos();
  //  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center p-12 mt-24">
        {/* Texto explicativo da tela */}
      <div className="flex items-center p-4 gap-3 absolute top-20 left-72">
        <MdOutlineReport className="h-9 w-9" />
        <h1 className="text-xl md:text-2xl font-semibold text-left">Painel de Relatos</h1>
      </div>

      <div className="flex flex-col items-center p-6 shadow-lg bg-white w-full max-w-xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-green-800 mb-3">Meus Relatos</h2>
          <p className="text-gray-700 text-sm mb-3">Acompanhe o status dos seus relatos e relate novos casos.</p>
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