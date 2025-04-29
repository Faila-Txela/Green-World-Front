import { useState, useEffect, useRef } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../modules/service/api/user';

function PersonalPerfil() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);  // Referência para o dropdown
  const profileRef = useRef<HTMLDivElement | null>(null);  // Referência para o perfil

  // Fecha o dropdown se clicar fora
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = async () => {
    alert("Logout feito")
    try {

        const userId = localStorage.getItem('userId');
        //const empresaId = localStorage.getItem('empresaId');

        if (!userId) {
            throw new Error("Usuário não encontrados.");
        }

        await userService.logOut(); 

        //localStorage.removeItem('empresaId'); // Remove o id da empresa (se tiver)
        //localStorage.removeItem('empresa');  
        localStorage.removeItem('userId'); 
        localStorage.removeItem('user'); 
        localStorage.removeItem('token');    
        navigate("/");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
  };

  const goToSettings = () => {
    navigate('/settings')
  };

  return (
    <div className="p-3 flex items-center gap-3 cursor-pointer relative z-20">
      {/* Card de Perfil com Ícone e Nome */}
      <div 
        ref={profileRef} 
        className="flex items-center gap-3 p-3 rounded-lg shadow-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        <MdAccountCircle size={28} color='white' className="" />
        <IoIosArrowDown size={18} color='white' className="" />
      </div>

      {/* Dropdown Menu Lateral */}
      {isDropdownOpen && (
        <div ref={dropdownRef} className="absolute right-0 top-0 mt-16 bg-white p-4 rounded-lg shadow-lg w-48 z-30">
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
            Sair
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalPerfil;
