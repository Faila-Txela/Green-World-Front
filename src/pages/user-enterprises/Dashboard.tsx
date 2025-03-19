import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { VscFeedback } from "react-icons/vsc";
import Principal from "components/Dashboard/Principal";
import Relatar from "../../pages/user-normal/Relatar";
import Settings from "components/client/Settings";
import Feedback from "components/client/Feedback";
//https://www.google.com/maps/@-8.8333099,13.2571516,15z?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D

type ComponentKey = "Dashboard" | "Feedback" | "Relatar" | "Settings";


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeComponente, setActiveComponent] = useState<ComponentKey>("Dashboard");

  // Definir o tipo correto das chaves do ComponentMap

  const ComponentMap = {
    Dashboard: <div>Dashboard</div>,
    Feedback: <div>Feedback</div>,
    Relatar: <div>Relatar</div>,
    Settings: <div>Settings</div>
  };

  return (
    <div className="flex">
      <div className="fixed h-[calc(100%-100px)]flex flex-col justify-between z-10" >
        {/* Botão para abrir/fechar Sidebar */}
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoMdArrowBack size={24} /> : <RxHamburgerMenu size={24} />}
        </button>

        {/* Sidebar */}
        <div className={`bg-green-800 h-screen fixed top-0 left-0 p-5 pt-20 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>

          {/* Menu */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Dashboard")}>
              <MdOutlineSpaceDashboard size={20} />
              {isOpen && <span>Dashboard</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Relatar")}>
              <GoReport size={20} />
              {isOpen && <span>Relatar</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Feedback")}>
              <VscFeedback size={20} />
              {isOpen && <span>Feedback</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Settings")}>
              <FiSettings size={20} />
              {isOpen && <span>Configurações</span>}
            </div>
          </div>
        </div>
      </div>
      {/* Conteúdo do Componente Ativo */}
      <div className={isOpen ? "ml-[20vw] p-7 w-full mt-[10px]" : "ml-[6vw] p-7 w-full mt-[10px]" }>{ComponentMap[activeComponente]}</div>
    </div>
  );
};

export default Dashboard;


