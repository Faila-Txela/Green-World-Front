import { useState } from "react";
import { MdOutlineSpaceDashboard, MdOutlineCalendarMonth } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import DashHeader from "../../components/Headers/DashHeader";
import EnterpriseDashboard from "../../components/Dashboards/EnterpriseDashboard";
import Relatorio from "../../components/Relatorio";
import Agendar from "../../components/Agendar";
import EnterpriseSettings from "../../components/client/settings/EnterpriseSettings";
import Feedback from "../../components/client/Feedback";

//https://www.google.com/maps/@-8.8333099,13.2571516,15z?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D

type ComponentKey = "EnterpriseDashboard" | "Relatorio" | "Agendar" | "Feedback" | "EnterpriseSettings";


const EnterpriseSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponente, setActiveComponent] = useState<ComponentKey>("EnterpriseDashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Definir o tipo correto das chaves do ComponentMap
  const ComponentMap = {
    EnterpriseDashboard: <EnterpriseDashboard />,
    Relatorio: <Relatorio />,
    Agendar: <Agendar />,
    Feedback: <Feedback />,
    EnterpriseSettings: <EnterpriseSettings 
      onChangeProfilePic={() => console.log("Profile picture changed")} 
      onChangeTheme={() => console.log("Theme changed")} 
      onDeleteAccount={() => console.log("Account deleted")} 
    />
  };

  return (
    <div className="flex z-10">
      {/* Estado da sidebar */}
      <DashHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onLogout={() => console.log("Logout triggered")} />

      <div className="fixed h-[calc(100%-100px)]flex flex-col justify-between z-10" >

        {/* Sidebar */}
        <div className={`bg-green-800 h-screen fixed top-0 left-0 p-5 pt-20 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
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
              onClick={() => setActiveComponent("EnterpriseSettings")}>
              <FiSettings size={20} />
              {isSidebarOpen && <span>Configurações da Empresa</span>}
            </div>

          </div>
        </div>
      </div>
      {/* Conteúdo do Componente Ativo */}
      <div className={isSidebarOpen ? "ml-[20vw] p-7 w-full mt-[10px]" : "ml-[6vw] p-7 w-full mt-[10px]" }>{ComponentMap[activeComponente]}</div>
    </div>
  );
};

export default EnterpriseSidebar;
