import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../modules/service/api/user/index";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { GoReport } from 'react-icons/go';
import DashHeader from "../../components/layout/DashHeader";
import PersonalDashboard from "../Dashboards/PersonalDashboard";
import Relatos from "../../components/Relatos";
import Notifications from "../../pages/Notifications";
import PersonalSettings from "../../components/client/settings/PersonalSettings";
import Feedback from "../../components/client/Feedback";


type ComponentKey = "PersonalDashboard" | "Feedback" | "Relatos" | "Notificacao" | "PersonalSettings";

const PersonalSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponente, setActiveComponent] = useState<ComponentKey>("PersonalDashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const ComponentMap = {
    PersonalDashboard: <PersonalDashboard />,
    Feedback: <Feedback />,
    Relatos: <Relatos />,
    Notificacao: <Notifications />,
    PersonalSettings: <PersonalSettings />
  };

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const empresaId = localStorage.getItem('empresaId');

      if (userId || empresaId) {
        await userService.logOut();
      }

      localStorage.clear(); 
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao encerrar a sessão.");
    }
  };

  return (
    <div className="flex z-10">
      <DashHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onLogout={handleLogout} />

      {/* Sidebar Container */}
      <div className={`bg-green-800 h-screen fixed top-0 left-0 p-5 pt-24 text-white transition-all duration-300 flex flex-col justify-between ${isSidebarOpen ? "w-64" : "w-20"}`}>
        
        {/* Itens Superiores */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("PersonalDashboard")}>
            <MdOutlineSpaceDashboard size={24} />
            {isSidebarOpen && <span>Dashboard</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("Feedback")}>
            <VscFeedback size={24} />
            {isSidebarOpen && <span>Feedback</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("Relatos")}>
            <GoReport size={24} />
            {isSidebarOpen && <span>Relatos</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("Notificacao")}>
            <IoNotificationsCircleOutline size={24} />
            {isSidebarOpen && <span>Notificações</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("PersonalSettings")}>
            <FiSettings size={24} />
            {isSidebarOpen && <span>Configurações</span>}
          </div>
        </div>

        {/* Botão de Logout */}
        <div className="mb-10">
          <div 
            className="flex items-center gap-3 p-2 rounded-md cursor-pointer transition text-red-400 hover:text-white"
            onClick={handleLogout}
          >
            <CiLogout size={24} />
            {isSidebarOpen && <span>Terminar Sessão</span>}
          </div>
        </div>
      </div>

      {/* Conteúdo do Componente Ativo */}
      <div className={`transition-all duration-300 p-7 w-full mt-[60px] ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {ComponentMap[activeComponente]}
      </div>
    </div>
  );
};

export default PersonalSidebar;