import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../modules/service/api/user';
import defaultPic from '../../../assets/default-avatar-profile-picture-male-icon.png'; // ajuste o caminho se necessário

function PersonalPerfil() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Carregar foto da empresa
  useEffect(() => {
    const fotoUrl = localStorage.getItem("empresaFoto");
    setFoto(fotoUrl || defaultPic);
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        profileRef.current && !profileRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = async () => {
    alert("Logout feito");
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error("Usuário não encontrado.");
      await userService.logOut();
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userFoto'); 
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="p-3 flex items-center gap-3 cursor-pointer relative z-20">
      <div
        ref={profileRef}
        className="flex items-center gap-2 p-2 rounded-full cursor-pointer"
        onClick={toggleDropdown}
      >
        <img
          src={foto || defaultPic}
          alt="Perfil"
          className="w-10 h-10 rounded-full border-2 border-green-500 object-cover cursor-pointer hover:opacity-80"
        />
        <IoIosArrowDown size={18} color='white' className="" />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-0 mt-16 bg-white p-4 rounded-lg shadow-lg w-48 z-30"
        >
          <div
            onClick={goToSettings}
            className="text-black hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all"
          >
            Configurações
          </div>
          <div
            onClick={handleLogout}
            className="text-red-500 hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all mt-1"
          >
            Terminar Sessão
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalPerfil;
