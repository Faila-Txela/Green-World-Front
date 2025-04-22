import { useCallback, useEffect, useState } from "react";
import NotificacaoCard from "../components/notificacao/notificacao_card";
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
  const { user } = useAuth();
  

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    setLoading(true); 
    try {
      const response = await axios.get(`/notificacao/${user.id}/user`);
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading) {
    return <div className="text-center py-4">Carregando notificações...</div>;
  }

  if (notifications.length === 0) {
    return <div className="h-screen flex items-center justify-center text-center py-4">Você não tem notificações.</div>;
  }

  return (
    <div>
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