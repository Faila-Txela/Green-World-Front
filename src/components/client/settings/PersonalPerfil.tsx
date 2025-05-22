import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { CiLogout, CiSettings } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../modules/service/api/user';
import defaultPic from '../../../assets/default-avatar-profile-picture-male-icon.png';

function PersonalPerfil() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
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
  try {
    const userId = localStorage.getItem('userId');
    const empresaId = localStorage.getItem('empresaId');

    if (userId || empresaId) {
      await userService.logOut(); 
    }

    // Remover dados do usuário
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('userFoto');

    // Remover dados da empresa
    localStorage.removeItem('empresaId');
    localStorage.removeItem('empresa');
    localStorage.removeItem('empresaFoto');
    localStorage.removeItem('empresaNome');

    localStorage.removeItem('token');

    // Redirecionar
    navigate("/");

  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    alert("Erro ao encerrar a sessão. Tente novamente.");
  }
};

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="p-3 flex items-center gap-3 cursor-pointer relative z-20">

      {/* Perfil dropdown */}
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
        <IoIosArrowDown 
          size={18} 
          className="text-black dark:text-white transition-colors duration-300" 
        />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-0 mt-16 bg-gray-100 p-4 rounded-lg shadow-lg w-56 z-30 transition-colors duration-300"
        >
          <div
            onClick={goToSettings}
            className="text-black hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all flex items-center gap-4">
            Configurações
            <CiSettings color='' size={24} className='' />
          </div>

          <div
            onClick={handleLogout}
            className="text-red-500 hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all mt-1 flex items-center gap-4">
            Terminar Sessão
            <CiLogout color='' size={24} className='cursor-pointer' />
          </div>
    </div>

      )}
    </div>
  );
}

export default PersonalPerfil;