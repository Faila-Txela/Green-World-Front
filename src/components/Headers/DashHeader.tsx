import Avatar from "../../components/ui/Avatar";
import { useNavigate } from "react-router-dom";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import NotificacoesInApp from "../../components/NotificationInApp";
import Notifications from "../../pages/Notifications";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import axios from "../../lib/axios";

interface DashHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  onLogout: () => void;
}

const DashHeader: React.FC<DashHeaderProps> = ({ toggleSidebar, isSidebarOpen, onLogout}) => {
  const navigate = useNavigate()  

  const handleLogout = async () => {
    try {
      // Logout() 
      const response = await axios.get("/logout", {
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      if (response.status === 200) { 
        //onLogout(); 
      } else {
        console.error("Erro ao tentar terminar a sessão");
      }
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  const handleChangeTheme = () => {
    alert("Tema alterado💯");
  };

  const handleChangeProfilePic = () => {
    alert("Foto de perfil alterada💯");
  };

  return (
    <div className="w-full flex justify-between fixed top-0 left-0 p-3 bg-green-800 shadow-lg z-50">

      {/* Botão para abrir/fechar Sidebar */}
      <button
        className="text-white p-2 bg-green-700 rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <IoMdArrowBack size={24} /> : <RxHamburgerMenu size={24} />}
      </button>

      {/* <Avatar
        nome="Albertina Sauimbo"
        tipoUsuario="Administrador"
        onLogout={handleLogout}
        onChangeTheme={handleChangeTheme}
        onChangeProfilePic={handleChangeProfilePic}
      /> */}

      {/* Notificações */}
      {/* <NotificacoesInApp  empresaId="74cd7463-0d3d-4045-bbd6-03df6364988e"/> */}

      <div className="py-2 px-8 bg-white rounded cursor-pointer flex items-center gap-4" onClick={() => navigate("/notificacao")}>
      <IoNotificationsCircleOutline size={32} color="green" /> 
      <span className="font-medium text-lg text-green-800">Notificações</span>
      </div>

    </div>
  );
}

export default DashHeader;
