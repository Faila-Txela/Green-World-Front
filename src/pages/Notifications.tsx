import { useCallback, useEffect, useState } from "react";
import NotificacaoCard from "../components/notificacao/notificacao_card";
import { IoNotificationsCircleOutline, IoNotificationsOffCircleOutline } from "react-icons/io5";
import Toast from "../components/ui/Toast";
import axios from "./../lib/axios";

interface Notificacao {
  id: string;
  mensagen: string;
  titulo: string;
  createAt: Date;
  lida?: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtro, setFiltro] = useState<"todas" | "lidas" | "nao-lidas">("todas");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const user = JSON.parse(
    localStorage.getItem("user") || localStorage.getItem("empresa") || "{}"
  );

  const fetchNotifications = useCallback(async () => {
  if (!user?.id) return; // Verifica se o user.id existe
  setLoading(true);
  try {
    const response = user.tipoEmpresa_id ?
     await axios.get(`/notificacao/${user.id}/empresa`)
     : await axios.get(`/notificacao/${user.id}/user`);

    console.log('Resposta', response, user);

    console.log('Resposta da API:', response.data);

    if (response.data && Array.isArray(response.data)) {
      const comEstadoLido = response.data.map((n: Notificacao) => ({
        ...n,
        createAt: new Date(n.createAt), // Garante que é um Date object
        lida: n.lida ?? false,
      }));

      setNotifications(comEstadoLido);
    } else {
      setNotifications([]);
    }
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    setToast({ message: "Erro ao carregar notificações.", type: "error" });
  } finally {
    setLoading(false);
  }
}, [user?.id, user?.tipoEmpresa_id]); // Dependências mais específicas

  useEffect(() => {
    fetchNotifications();
  }, []);

 const marcarComoLida = async (id: string) => {
  try {
    await axios.put(`/notificacao/${id}/marcar-lida`, { lida: true }); // Envia o status
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  } catch (error) {
    console.error("Erro ao marcar notificação como lida", error);
    setToast({ message: "Erro ao marcar notificação como lida.", type: "error"});
  }
};

  const notificacoesFiltradas = notifications.filter((n) => {
    if (filtro === "lidas") return n.lida;
    if (filtro === "nao-lidas") return !n.lida;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <IoNotificationsCircleOutline size={64} className="text-green-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Carregando Notificações...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <IoNotificationsOffCircleOutline size={64} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">Você não tem notificações.</h2>
        <p className="text-gray-400 mt-2">Volte mais tarde para ver se há novidades.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-10 px-6">
      <div className="flex flex-col gap-6">

        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4">
          <div className="flex items-center gap-3">
            <IoNotificationsCircleOutline size={40} className="text-green-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-800">Painel de Notificações</h1>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                filtro === "todas" ? "bg-green-500 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>

            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                filtro === "nao-lidas" ? "bg-yellow-500 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setFiltro("nao-lidas")}
            >
              Não lidas
            </button>

            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                filtro === "lidas" ? "bg-gray-600 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setFiltro("lidas")}
            >
              Lidas
            </button>
          </div>
        </div>

        {/* Lista de Notificações */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {notificacoesFiltradas.map((notification) => (
            <NotificacaoCard
              key={notification.id}
              data={notification.createAt}
              mensagem={notification.mensagen}
              titulo={notification.titulo}
              lida={notification.lida}
              onMarcarComoLida={() => marcarComoLida(notification.id)}
            />
          ))}
        </div>
      </div>

      {/* Toast para mensagens de feedback */}
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
