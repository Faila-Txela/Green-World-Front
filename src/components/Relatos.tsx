import { useState, useEffect } from "react";
import { MdOutlineReport } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import PrimaryButton from "../components/ui/PrimaryButton";
import Toast from "../components/ui/Toast";
import ModalRelatar from "../components/modal/ModalRelatar";
import { relatarService } from "../modules/service/api/relatar";
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

    interface Relato {
      id: string;
      descricao: string;
      latitude: number;
      longitude: number;
      bairro: string;
      createdAt: string;
      provincia?: {
        nome: string;
      };
      municipio?: {
        nome: string;
      };
      prioridade: "BAIXA" | "ALTA";
      statusColeta?: "RETIRADO" | "NAO_RETIRADO" | "PENDENTE";
      user?: {
        nome_titular: string;
      };
    }

    export default function Relatos() {
      const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [relatoSelecionado, setRelatoSelecionado] = useState<Relato | null>(null);
      const [relatos, setRelatos] = useState<Relato[]>([]);
      const [loading, setLoading] = useState(true);

      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);
      const handleFecharPainel = () => setRelatoSelecionado(null);

      const fetchRelatos = async () => {
        try {
          setLoading(true);
          const response = await relatarService.getAll();
          console.log("Dados recebidos:", response.data);
          
          // Verifique se os dados têm a estrutura esperada
          if (!Array.isArray(response.data)) {
            throw new Error("Os dados recebidos não são um array");
          }
          
          // Mapeie os dados com verificações de segurança
          const relatosFormatados = response.data.map((relato: any) => ({
            id: relato.id,
            descricao: relato.descricao,
            latitude: relato.latitude,
            longitude: relato.longitude,
            bairro: relato.bairro,
            createdAt: relato.createdAt,
            provincia: relato.provincia || { nome: 'N/A' },
            municipio: relato.municipio || { nome: 'N/A' },
            prioridade: relato.prioridade,
            statusColeta: relato.statusColeta,
            user: relato.user || { nome_titular: 'Anônimo' }
          }));
          
          setRelatos(relatosFormatados);
        } catch (error) {
          console.error("Erro ao buscar relatos:", error);
          setToast({ message: "Erro ao carregar relatos.", type: "error" });
          setRelatos([]); // Define como array vazio em caso de erro
        } finally {
          setLoading(false);
        }
      };

      const handleNovoRelato = () => {
        fetchRelatos();
        setToast({ message: "Novo relato adicionado com sucesso!", type: "success" });
      };
      
    const formatarData = (dataString?: string) => {
      if (!dataString || typeof dataString !== "string") {
        return "Data inválida";
      }

      try {
        const data = parseISO(dataString);
        return format(data, "dd/MM/yyyy HH:mm", { locale: pt });
      } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
      }
    };


      const getStatus = (relato: Relato) => {
        if (relato.statusColeta === "RETIRADO") return "resolvido";
        if (relato.statusColeta === "NAO_RETIRADO") return "pendente";
        return "pendente";
      };

      useEffect(() => {
        fetchRelatos();
      }, []);

      return (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="fixed top-0 z-10 bg-white shadow-md px-4 py-3 md:px-8 md:py-4 flex flex-col md:flex-row items-center gap-4 md:gap-12 mt-20">
            {/* Título e ícone */}
            <div className="flex items-center gap-2 md:gap-3">
              <MdOutlineReport size={24} className="text-green-800 animate-pulse" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                Painel de Relatos
              </h1>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto justify-center md:justify-end">
              <PrimaryButton 
                name="Atualizar Relatos" 
                addClassName="w-full sm:w-auto" 
                onClick={fetchRelatos} 
                disabled={loading}
              />
              <PrimaryButton 
                name="Relatar Novo Amontoado" 
                addClassName="w-full sm:w-auto" 
                onClick={openModal} 
              />
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
    {loading ? (
      <div className="flex flex-col items-center justify-center text-center mt-12">
        <MdOutlineReport size={64} className="text-green-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Carregando Relatos...</p>
      </div>
    ) : relatos.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <MdOutlineReport size={48} className="text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">Nenhum Amontoado Reportado</h3>
        <p className="text-gray-500 mb-6">Não encontramos relatos recentes de amontoados de lixo.</p>
        <PrimaryButton 
          name="Relatar Primeiro Amontoado" 
          onClick={openModal}
          addClassName="w-auto"
        />
      </div>
    ) : (
      relatos.map((relato) => (
        <div
          key={relato.id}
          onClick={() => setRelatoSelecionado(relato)}
          className="bg-white shadow-lg p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-bold text-lg">
            {relato.descricao?.substring(0, 50) || "Sem descrição"}{relato.descricao?.length > 50 ? "..." : ""}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            {relato.bairro || "Sem localização"}, {relato.municipio?.nome || "Município desconhecido"}
          </p>
          <span className="text-xs text-gray-600">{relato.createdAt ? formatarData(relato.createdAt) : "Data desconhecida"}</span>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full animate-pulse ${
                relato.prioridade === "ALTA" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
              }`}
            >
              {relato.prioridade === "ALTA" ? "🔴 Alta Prioridade" : "🔵 Baixa Prioridade"}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full animate-pulse ${
                getStatus(relato) === "resolvido" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {getStatus(relato) === "resolvido" ? "✅ Resolvido" : "⌛ Pendente"}
            </span>
          </div>
        </div>
      ))
    )}
            </div>

            {/* Aba lateral com detalhes */}
            {relatoSelecionado && (
              <div className="w-[65%] h-full px-6 py-6 overflow-y-auto bg-white shadow-lg transition-all duration-300 relative">
                <button
                  type="button"
                  onClick={handleFecharPainel}
                  className="absolute top-4 right-4 text-black hover:text-gray-300 duration-300 text-2xl"
                  title="Fechar"
                >
                  <IoClose />
                </button>

                <h2 className="text-2xl font-semibold mb-4">Detalhes do Relato</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Data/Hora</p>
                    <p className="text-gray-600">{formatarData(relatoSelecionado.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Reportado por</p>
                    <p className="text-gray-600">{relatoSelecionado.user?.nome_titular || "Anônimo"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Localização</p>
                    <p className="text-gray-600">
                      {relatoSelecionado.bairro}, {relatoSelecionado.municipio?.nome || "Município desconhecido"}, {relatoSelecionado.provincia?.nome || "Província desconhecida"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Prioridade</p>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full animate-pulse ${
                        relatoSelecionado.prioridade === "ALTA" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {relatoSelecionado.prioridade === "ALTA" ? "🔴 Alta Prioridade" : "🔵 Baixa Prioridade"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Status</p>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full animate-pulse ${
                        getStatus(relatoSelecionado) === "resolvido"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {getStatus(relatoSelecionado) === "resolvido" ? "✅ Resolvido" : "⌛ Pendente"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Coordenadas</p>
                    <p className="text-gray-600">
                      Lat: {relatoSelecionado.latitude}, Long: {relatoSelecionado.longitude}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Descrição</p>
                  <p className="text-gray-600 whitespace-pre-line">{relatoSelecionado.descricao}</p>
                </div>

                {/* Mapa com a localização */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-2">Mapa</p>
                  <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300">
                    <iframe
                      title="Mapa do Relato"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={`https://maps.google.com/maps?q=${relatoSelecionado.latitude},${relatoSelecionado.longitude}&z=15&output=embed`}
                    ></iframe>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex justify-end gap-4 mt-6">
                  <PrimaryButton
                    name="Marcar como Resolvido"
                    addClassName="bg-green-600 hover:bg-green-700"
                    onClick={async () => {
                      try {
                        // Aqui implemento a chamada para atualizar o status
                        await relatarService.updateStatus(relatoSelecionado.id, "RETIRADO");
                        setToast({ message: "Relato marcado como resolvido!", type: "success" });
                        fetchRelatos();
                        handleFecharPainel();
                      } catch (error) {
                        setToast({ message: "Erro ao atualizar status", type: "error" });
                      }
                    }}
                  />
                  <PrimaryButton
                    name="Excluir Relato"
                    addClassName="bg-red-600 hover:bg-red-700"
                    onClick={async () => {
                      if (window.confirm("Tem certeza que deseja excluir este relato?")) {
                        try {
                          await relatarService.delete(relatoSelecionado.id);
                          setToast({ message: "Relato excluído com sucesso!", type: "success" });
                          fetchRelatos();
                          handleFecharPainel();
                        } catch (error) {
                          setToast({ message: "Erro ao excluir relato", type: "error" });
                        }
                      }
                    }}
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
          {isModalOpen && (
            <ModalRelatar 
              closeModal={closeModal} 
              setToast={setToast} 
              onRelatoSuccess={handleNovoRelato}
            />
          )}
        </div>
      );
    }