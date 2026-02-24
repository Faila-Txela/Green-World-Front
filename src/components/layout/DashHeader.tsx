import { useNavigate } from "react-router-dom";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import PersonalPerfil from "../client/settings/PersonalPerfil";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";

interface DashHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  onLogout: () => void;
}

const DashHeader: React.FC<DashHeaderProps> = ({ toggleSidebar, isSidebarOpen, onLogout }) => {
  const navigate = useNavigate()  

  return (
    <header className="w-full flex items-center justify-between fixed top-0 left-0 px-4 py-2 bg-green-800 shadow-lg z-50 h-16">
      {/* Botão para abrir/fechar Sidebar */}
      <button
        type="button"
        className="text-white p-1 bg-green-700 rounded-md hover:bg-green-600 transition-colors"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <IoMdArrowBack size={26} /> : <RxHamburgerMenu size={20} />}
      </button>

      <div className="flex items-center gap-4">
        {/* Ícone de Notificações */}
        <button 
          type="button"
          title="Notificações"
          className="text-white hover:text-green-200 transition-colors"
          onClick={() => navigate("/notificacao")}
        >
          <IoNotificationsCircleOutline size={26} />
        </button>

        {/* Perfil do Usuário */}
        <div className="cursor-pointer">
          <PersonalPerfil />
        </div>
      </div>
    </header>
  );
}

export default DashHeader;