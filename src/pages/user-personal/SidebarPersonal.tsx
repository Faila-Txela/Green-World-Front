import { useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { GoReport } from 'react-icons/go';
import DashHeader from "../../components/Headers/DashHeader";
import PersonalDashboard from "../../components/Dashboards/PersonalDashboard";
import Relatos from "../../components/Relatos";
import Notifications from "../../pages/Notifications";
import PersonalSettings from "../../components/client/settings/PersonalSettings";
import Feedback from "../../components/client/Feedback";

type ComponentKey = "PersonalDashboard" | "Feedback" | "Relatos" | "Notificacao" | "PersonalSettings";


const PersonalSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponente, setActiveComponent] = useState<ComponentKey>("PersonalDashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  // Definindo o tipo correto das chaves do ComponentMap
  const ComponentMap = {
    PersonalDashboard: <PersonalDashboard />,
    Feedback: <Feedback />,
    Relatos: <Relatos />,
    Notificacao: <Notifications />,
    PersonalSettings: <PersonalSettings 
      //onChangeProfilePic={() => { alert("Imagem de perfil mudada") }} 
      //onChangeTheme={() => { alert("Tema mudado") }} 
      //onDeleteAccount={() => { alert("Conta excluida") }} 
    />
  };

  return (
    <div className="flex z-10">
      <DashHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onLogout={() => { /* handle logout */ }} />

      <div className="fixed h-[calc(100%-100px)]flex flex-col justify-between z-10" >

        {/* Sidebar */}
        <div className={`bg-green-800 h-screen fixed top-0 left-0 p-5 pt-20 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("PersonalDashboard")}>
              <MdOutlineSpaceDashboard size={20} />
              {isSidebarOpen && <span>Dashboard</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Feedback")}>
              <VscFeedback size={20} />
              {isSidebarOpen && <span>Feedback</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Relatos")}>
              <GoReport size={20} />
              {isSidebarOpen && <span>Relatos</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Notificacao")}>
              <IoNotificationsCircleOutline size={20} />
              {isSidebarOpen && <span>Notificações</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("PersonalSettings")}>
              <FiSettings size={20} />
              {isSidebarOpen && <span>Configurações</span>}
            </div>

          </div>
        </div>
      </div>

      {/* Conteúdo do Componente Ativo */}
      <div 
      className={isSidebarOpen ? "ml-[20vw] p-7 w-full mt-[10px]" : "ml-[6vw] p-7 w-full mt-[10px]" }>
        {ComponentMap[activeComponente]}
      </div>

    </div>
  );
};

export default PersonalSidebar;
