import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { VscFeedback } from "react-icons/vsc";
import DashHeader from "../../components/Headers/DashHeader";
import Principal from "../../components/Dashboards/PersonalDashboard";
import Settings from "../../components/client/Settings";
import Feedback from "../../components/client/Feedback";
import Terms from "../../components/client/Terms";

//https://www.google.com/maps/@-8.8333099,13.2571516,15z?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D

type ComponentKey = "Dashboard" | "Feedback" | "Settings" | "Terms";


const EnterpriseSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponente, setActiveComponent] = useState<ComponentKey>("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  // Definir o tipo correto das chaves do ComponentMap
  const ComponentMap = {
    Dashboard: <Principal />,
    Feedback: <Feedback />,
    Settings: <Settings />,
    Terms: <Terms />
  };

  return (
    <div className="flex z-10">
      {/* Estado da sidebar */}
      <DashHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="fixed h-[calc(100%-100px)]flex flex-col justify-between z-10" >

        {/* Sidebar */}
        <div className={`bg-green-800 h-screen fixed top-0 left-0 p-5 pt-20 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Dashboard")}>
              <MdOutlineSpaceDashboard size={20} />
              {isSidebarOpen && <span>Dashboard</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Feedback")}>
              <VscFeedback size={20} />
              {isSidebarOpen && <span>Feedback</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Settings")}>
              <FiSettings size={20} />
              {isSidebarOpen && <span>Configurações</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition ">
            <FiSettings size={20} />
            <Link to="/Terms">Termos</Link>
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
