
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { Popover } from "@headlessui/react";
import { Inbox } from "@novu/react";

function NotificacoesInApp({ empresaId }: { empresaId: string }) {
  return (
    <Popover className="relative">
      <Popover title="Notificações">
        <IoNotificationsCircleOutline size={32} />
      </Popover>

      <Popover className="absolute right-0 z-10">
        <Inbox
          applicationIdentifier="upL7hpgZonxX"
          subscriberId={empresaId}
        />
      </Popover>
    </Popover>
  );
}

export default NotificacoesInApp;
