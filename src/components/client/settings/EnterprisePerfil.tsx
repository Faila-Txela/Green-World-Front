import { useState, useEffect, useRef } from 'react';
import { useProfile } from '../../../routes/profileContext';
import defaultPic from '../../../assets/default-avatar-profile-picture-male-icon.png';

function EnterprisePerfil() {
  const { profilePic, setProfilePic } = useProfile();
  const [foto, setFoto] = useState<string>(defaultPic);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Carregar foto do localStorage
  useEffect(() => {
    const fotoUrl = localStorage.getItem("userFoto");
    setFoto(fotoUrl || defaultPic);
  }, []);


  // Novo handler para selecionar imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Salva no localStorage e atualiza o estado
       setProfilePic(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // No componente onde mostra a foto de perfil
useEffect(() => {
  const handleStorageChange = () => {
    const novaFoto = localStorage.getItem("userFoto");
    setProfilePic(novaFoto);
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);


  return (
    <div className="p-3 flex items-center gap-3 cursor-pointer relative z-20">

      {/* Perfil dropdown */}
      <div
        ref={profileRef}
        className="flex items-center gap-2 p-2 rounded-full cursor-pointer"
      >
        <img
          src={profilePic || defaultPic}
          alt="Perfil"
          className="w-10 h-10 rounded-full border-2 border-green-500 object-cover hover:opacity-80"
        />
      </div>

      {/* Input de imagem*/}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="inputFotoPerfil"
      />

      {/* Ícone para abrir o seletor de imagem */}
      <label
        htmlFor="inputFotoPerfil"
        className="bg-green-500 text-white text-xs rounded-md p-1 cursor-pointer hover:bg-green-600"
      >
        Alterar Foto
      </label>
    </div>
  );
}

export default EnterprisePerfil;
