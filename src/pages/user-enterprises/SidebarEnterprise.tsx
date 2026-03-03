import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../modules/service/api/user/index";
import { MdOutlineSpaceDashboard, MdOutlineCalendarMonth } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import DashHeader from "../../components/layout/DashHeader";
import EnterpriseDashboard from "../Dashboards/EnterpriseDashboard";
import Relatorio from "../../components/Relatorio";
import Agendar from "../../components/Agendar";
import EnterpriseSettings from "../../components/client/settings/EnterpriseSettings";
import Notifications from "../../pages/Notifications";
import Feedback from "../../components/client/Feedback";

type ComponentKey = "EnterpriseDashboard" | "Relatorio" | "Agendar" | "Notifications" | "Feedback" | "EnterpriseSettings";

const EnterpriseSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponente, setActiveComponent] = useState<ComponentKey>("EnterpriseDashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const ComponentMap = {
    EnterpriseDashboard: <EnterpriseDashboard />,
    Relatorio: <Relatorio />,
    Agendar: <Agendar />,
    Notifications: <Notifications />,
    Feedback: <Feedback />,
    EnterpriseSettings: <EnterpriseSettings />
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
    <div className="flex">
      {/* Header */}
      <DashHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onLogout={handleLogout} />
      
      {/* Sidebar */}
      <div className={`bg-green-800 h-screen fixed top-0 left-0 p-5 pt-24 text-white transition-all duration-300 flex flex-col justify-between z-20 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        
        {/* Links do Menu */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("EnterpriseDashboard")}>
            <MdOutlineSpaceDashboard size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("Feedback")}>
            <VscFeedback size={20} />
            {isSidebarOpen && <span>Feedback</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("Relatorio")}>
            <VscFeedback size={20} />
            {isSidebarOpen && <span>Relatório dos Relatos</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("Agendar")}>
            <MdOutlineCalendarMonth size={20} />
            {isSidebarOpen && <span>Agendar Actividades</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("Notifications")}>
            <IoNotificationsCircleOutline size={20} />
            {isSidebarOpen && <span>Notificações</span>}
          </div>

          <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
            onClick={() => setActiveComponent("EnterpriseSettings")}>
            <FiSettings size={20} />
            {isSidebarOpen && <span>Configurações</span>}
          </div>
        </div>

        {/* Botão de Logout */}
        <div className="mb-5">
          <div 
            className="flex items-center gap-3 p-2 rounded-md cursor-pointer transition text-red-300 hover:bg-red-700 hover:text-white"
            onClick={handleLogout}
          >
            <CiLogout size={24} />
            {isSidebarOpen && <span>Terminar Sessão</span>}
          </div>
        </div>
      </div>

      <main className={`flex-1 p-7 transition-all duration-300 mt-16 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {ComponentMap[activeComponente]}
      </main>
    </div>
  );
};

export default EnterpriseSidebar;