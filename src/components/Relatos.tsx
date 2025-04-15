import { useState } from "react";
import { MdOutlineReport } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import PrimaryButton from "../components/ui/PrimaryButton";
import Toast from "../components/ui/Toast";
import ModalRelatar from "../components/modal/ModalRelatar";

export default function Relatos() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatoSelecionado, setRelatoSelecionado] = useState<any>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleFecharPainel = () => setRelatoSelecionado(null);

  const relatosExemplo = [
    {
      titulo: "Amontoado no bairro São Paulo",
      descricao: "Grande acúmulo de lixo perto do mercado informal.",
      foto: "https://images.unsplash.com/photo-1605042309866-1a9e3f80a688",
      data: "2025-04-14 09:00",
      local: "Luanda - São Paulo",
      status: "pendente",
    },
    {
      titulo: "Lixo hospitalar abandonado",
      descricao: "Resíduos hospitalares jogados próximos a uma escola.",
      foto: "https://images.unsplash.com/photo-1589987607627-8ee53a4a3172",
      data: "2025-04-13 17:45",
      local: "Luanda - Kilamba",
      status: "resolvido",
    },
    {
      titulo: "Contentor transbordando",
      descricao: "Contentor de lixo completamente cheio e lixo espalhado na rua.",
      foto: "https://images.unsplash.com/photo-1587820513273-84b90ac78fd3",
      data: "2025-04-12 11:15",
      local: "Luanda - Maianga",
      status: "pendente",
    },
    {
      titulo: "Lixo tóxico próximo a área residencial",
      descricao: "Possível resíduo químico emitindo odor forte.",
      foto: "https://images.unsplash.com/photo-1548611716-1b7d2cf79c59",
      data: "2025-04-10 08:10",
      local: "Luanda - Samba",
      status: "resolvido",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md fixed gap-12 mt-20 top-0 z-10">
        <div className="flex items-center gap-3">
          <MdOutlineReport size={28} />
          <h1 className="text-xl font-semibold">Painel de Relatos</h1>
        </div>
        <div className="flex gap-4">
          <PrimaryButton name="Ver Relatos Recentes" addClassName="" onClick={() => {}} />
          <PrimaryButton name="Relatar Novo Amontoado" addClassName="" onClick={openModal} />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 mt-36 transition-all duration-300">
        {/* Lista de relatos */}
        <div
          className={`overflow-y-auto border-r px-4 py-8 flex flex-col gap-4 transition-all duration-300 ${
            relatoSelecionado ? "w-[35%]" : "w-full"
          }`}
        >
          {relatosExemplo.map((relato, index) => (
            <div
              key={index}
              onClick={() => setRelatoSelecionado(relato)}
              className="bg-white shadow-lg p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-bold text-lg">{relato.titulo}</h3>
              <p className="text-sm text-gray-400 truncate">{relato.descricao}</p>
              <span className="text-xs text-gray-600">{relato.data}</span>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full animate-pulse ${
                    relato.status === "resolvido" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {relato.status === "resolvido" ? "✅ Resolvido" : "⌛ Pendente"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Aba lateral com detalhes */}
        {relatoSelecionado && (
          <div className="w-[65%] h-full px-6 py-6 overflow-y-auto bg-white shadow-lg transition-all duration-300 relative">
            {/* Botão de fechar */}
            <button
              onClick={handleFecharPainel}
              className="absolute top-4 right-4 text-black hover:text-gray-300 duration-300 text-2xl"
              title="Fechar"
            >
              <IoClose />
            </button>

            <h2 className="text-2xl font-semibold mb-4">{relatoSelecionado.titulo}</h2>
            <p className="mb-4 text-gray-400">{relatoSelecionado.descricao}</p>
            <p className="mb-2 text-sm text-gray-500">📍 Local: {relatoSelecionado.local}</p>
            <p className="mb-4 text-sm text-gray-500">🕒 {relatoSelecionado.data}</p>
            <div className="mb-4">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full animate-pulse ${
                  relatoSelecionado.status === "resolvido"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {relatoSelecionado.status === "resolvido" ? "✅ Resolvido" : "⌛ Pendente"}
              </span>
            </div>
            <div className="rounded-md overflow-hidden border border-gray-300">
              <img
                // src={relatoSelecionado.foto}
                src="/mine.png"
                alt="Foto do relato"
                className="w-full object-cover max-h-[400px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Toast e Modal */}
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
