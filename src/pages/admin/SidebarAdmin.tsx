import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { FaCity } from "react-icons/fa";
import { MdOutlinePolicy } from "react-icons/md";
import DashHeader from "../../components/Headers/DashHeader";
import AdminDashboard from "../../components/Dashboards/AdminDashboard";
import Users from "../../components/client/users";
import Feedback from "../../components/client/Feedback";
import Provincia from "../../components/client/Provincia";
import Municipio from "../../components/client/Municipio";
import Terms from "../../components/Terms";

type ComponentKey = "AdminDashboard" | "Feedback" | "Provincias" | "Municipios" | "Users" | "Terms";


const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponente, setActiveComponent] = useState<ComponentKey>("AdminDashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  // Definindo o tipo correto das chaves do ComponentMap
  const ComponentMap = {
    AdminDashboard: <AdminDashboard />,
    Feedback: <Feedback />,
    Provincias: <Provincia />,
    Municipios: <Municipio />,
    Users: <Users />,
    Terms: <Terms />
  };

  return (
    <div className="flex z-10">
      <DashHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} onLogout={() => { console.log("Logout clicado") }} />

      <div className="fixed h-[calc(100%-100px)]flex flex-col justify-between z-10" >

        {/* Sidebar */}
        <div className={`bg-green-800 h-screen fixed top-0 left-0 p-5 pt-20 text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("AdminDashboard")}>
              <MdOutlineSpaceDashboard size={20} />
              {isSidebarOpen && <span>Dashboard</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Feedback")}>
              <VscFeedback size={20} />
              {isSidebarOpen && <span>Feedback</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Provincias")}>
              <FaCity size={20} />
              {isSidebarOpen && <span>Provincías</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Municipios")}>
              <FaCity size={20} />
              {isSidebarOpen && <span>Municípios</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition"
              onClick={() => setActiveComponent("Users")}>
              <FaUsers size={20} />
              {isSidebarOpen && <span>Usuários</span>}
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-green-700 rounded-md cursor-pointer transition ">
            <MdOutlinePolicy size={20} />
            <Link to="/Terms">Termos</Link>
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

export default AdminSidebar;