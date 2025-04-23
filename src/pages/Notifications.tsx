import { useCallback, useEffect, useState } from "react";
import NotificacaoCard from "../components/notificacao/notificacao_card";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import axios from "./../lib/axios";
import { useAuth } from "../routes/auth_context";

interface Notificacao {
  id: string;
  mensagen: string;
  titulo: string;
  createAt: Date;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") || localStorage.getItem("empresa") || "{}");

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    setLoading(true); 
    try {
      const response = user?.tipoEmpresa_id ? await axios.get(`/notificacao/${user.id}/empresa`): await axios.get(`/notificacao/${user.id}/user`);
      console.log(response)
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Carregando notificações...</div>;
  }

  if (notifications.length === 0) {
    return <div className="h-screen flex items-center justify-center text-center py-4">Você não tem notificações.</div>;
  }

  return (
    <div>
     
     <div className="flex items-center gap-4 mb-6">
      <IoNotificationsCircleOutline size={28} className="h-9 w-9 text-green-600 animate-pulse" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel de Notificações</h1>
     </div>

      {notifications.map((notification, index) => (
        <NotificacaoCard
          data={notification.createAt}
          descricao={notification.mensagen}
          titulo={notification.titulo}
          key={index}
        />
      ))}
    </div>
  );
}