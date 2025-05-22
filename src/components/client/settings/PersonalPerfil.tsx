import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdSunny, MdDarkMode } from 'react-icons/md';
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

  // Verificar tema ao carregar
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

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

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
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
      {/* Botão de alternância de tema */}
      <button 
        type="button"
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#2a4f42] transition-colors duration-300"
        aria-label={darkMode ? "Modo claro" : "Modo escuro"}
      >
        {darkMode ? (
          <MdSunny size={20} className="text-yellow-400" />
        ) : (
          <MdDarkMode size={20} className="text-[#1a3a2f]" />
        )}
      </button>

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
          className="absolute right-0 top-0 mt-16 bg-white dark:bg-[#1a3a2f] p-4 rounded-lg shadow-lg w-48 z-30 transition-colors duration-300"
        >
          <div
            onClick={goToSettings}
            className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#2a4f42] p-2 rounded-md cursor-pointer transition-all"
          >
            Configurações
          </div>
          <CiSettings color='' size={24} className='' />
          <div
            onClick={toggleDarkMode}
            className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#2a4f42] p-2 rounded-md cursor-pointer transition-all mt-1 flex items-center gap-2"
          >
            {darkMode ? (
              <>
                <MdSunny size={16} className="text-yellow-400" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <MdDarkMode size={16} className="text-[#1a3a2f] dark:text-white" />
                <span>Modo Escuro</span>
              </>
            )}
          </div>
          <div
            onClick={handleLogout}
            className="text-red-500 hover:bg-gray-200 dark:hover:bg-[#2a4f42] p-2 rounded-md cursor-pointer transition-all mt-1"
          >
            Terminar Sessão
          </div>
          <CiLogout color='' size={24} className='cursor-pointer' />
        </div>
      )}
    </div>
  );
}

export default PersonalPerfil;