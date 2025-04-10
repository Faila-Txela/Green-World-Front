import { useCallback, useEffect, useState } from "react";
import NotificacaCard from "../components/notificacao/notificacao_card";
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
  const { user } = useAuth();
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const response = await axios.get(`/notificacao/${user.id}/user`);
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div>
      {notifications.map((notification, index) => (
        <NotificacaCard
          data={notification.createAt}
          descricao={notification.mensagen}
          titulo={notification.titulo}
          key={index}
        />
      ))}
    </div>
  );
}
