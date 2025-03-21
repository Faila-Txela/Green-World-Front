import React, { useState, useEffect, useRef } from "react";
import { FaPaintBrush, FaLanguage, FaSignOutAlt, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io" 

interface AvatarProps {
  nome: string;
  tipoUsuario: string;
  size?: number;
  onLogout: () => void;
  onChangeTheme: () => void;
  onChangeLanguage: (language: string) => void;  // Alterado para passar o idioma selecionado
  onChangeProfilePic: (newProfilePic: File) => void; // Passando o novo arquivo da foto de perfil
}

const Avatar: React.FC<AvatarProps> = ({
  nome,
  tipoUsuario,
  size = 50,
  onLogout,
  onChangeTheme,
  onChangeLanguage,
  onChangeProfilePic,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null); // Armazenando a imagem de perfil
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Para alternar o tema
  const [selectedLanguage, setSelectedLanguage] = useState<string>("pt"); // Idioma selecionado
  const popUpRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fecha o pop-up ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Função para lidar com a mudança da foto de perfil
  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Atualizando a foto de perfil com a imagem escolhida
      setProfilePic(URL.createObjectURL(file)); // Atualizando o estado da foto
      onChangeProfilePic(file); // Passando o novo arquivo para o pai
    }
  };

  // Alternar entre os temas
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    onChangeTheme();  // Chama o método para alternar o tema no componente pai
  };

  // Lidar com a mudança do idioma
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    onChangeLanguage(newLanguage); // Passando o idioma selecionado para o pai
  };

  return (
    <div className="relative">
      {/* Avatar com ícone de usuário */}
      <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="text-lg font-semibold">
          {/* Ícone de usuário */}
          <FaUserCircle size={size} />
        </div>
      </div>

      {/* Modal Pop-up */}
      {isOpen && (
        <div
          ref={popUpRef}
          className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-3 w-56 border z-50"
          style={{ top: size + 8, left: -200 }} 
        >
          <div className="flex items-center gap-2">
            {/* Foto de perfil */}
            <div
              className="flex items-center justify-center rounded-full bg-gray-300 w-12 h-12 cursor-pointer"
              onClick={() => fileInputRef.current?.click()} // Clica no input file ao clicar na foto de perfil
            >
              <img
                src={profilePic || "/default-avatar.png"} // Exibe a imagem atual ou uma imagem padrão
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden" // Oculta o input de file
            />
            <div className="text-sm font-semibold">
              <p>{tipoUsuario}</p>
              <p className="text-gray-600">{nome}</p>
            </div>
          </div>

          {/* Opções do pop-up */}
          <div className="mt-3 space-y-2">
            <button
              className="w-full text-left hover:text-gray-600 flex items-center gap-2"
              onClick={toggleTheme} // Alternar o tema
            >
              {isDarkTheme ? <FaSun size={18} /> : <FaMoon size={18} />} {/* Ícones de tema */}
              {isDarkTheme ? "Tema Claro" : "Tema Escuro"}
            </button>
            
            <div className="w-full text-left">
              <label className="text-sm block mb-1">Alterar Idioma</label>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="pt">Português</option>
                <option value="en">Inglês</option>
                <option value="es">Espanhol</option>
                <option value="fr">Francês</option>
              </select>
            </div>

            <button
              className="w-full text-left flex items-center gap-2 hover:text-gray-600"
              onClick={onLogout}
            >
              <FaSignOutAlt size={18} />
              Terminar Sessão
            </button>

            <button
              className="w-full text-left flex items-center gap-2 hover:text-gray-600"
              onClick={onLogout}
            >
              <IoIosSettings size={18} />
              Configurações
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;

