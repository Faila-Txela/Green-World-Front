import { useEffect, useRef, useState } from 'react';
import pic from '../../assets/default-avatar-profile-picture-male-icon.png';
import axios from '../../lib/axios';

const GeralSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Inputs preenchidos pelo usuário
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [iban, setIban] = useState('');

  // Dados da base de dados
  const [nomeDB, setNomeDB] = useState('');
  const [biografiaDB, setBiografiaDB] = useState('');
  const [ibanDB, setIbanDB] = useState('');
  const [fotoDB, setFotoDB] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`/users/${userId}`).then((res) => {
      const user = res.data;
      setNomeDB(user.nome || '');
      setBiografiaDB(user.biografia || '');
      setIbanDB(user.iban || '');
      setFotoDB(user.imagemPerfil || null);
      setProfilePic(user.imagemPerfil || null);
    });
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "greenworld");
    const res = await axios.post("https://api.cloudinary.com/v1_1/dujc01crk/image/upload", formData);
    return res.data.secure_url;
  };

  const handleSave = async () => {
    try {
      const imagemPerfil = await uploadToCloudinary();

      await axios.put(`/users/${userId}`, {
        nome: nome || nomeDB,
        biografia: biografia || biografiaDB,
        iban: iban || ibanDB,
        imagemPerfil,
      });

      alert('Alterações salvas com sucesso!');
      if (imagemPerfil) localStorage.setItem("userFoto", imagemPerfil);
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar alterações');
    }
  };

  const handleClear = () => {
    setNome('');
    setBiografia('');
    setIban('');
    setProfilePic(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Informações Gerais</h2>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={profilePic || pic}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-2 border-green-500 object-cover cursor-pointer hover:opacity-80"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          title="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfilePicChange}
          className="hidden text-black"
        />
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder={nomeDB || "Nome da Empresa"}
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500 text-black"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <textarea
          placeholder={biografiaDB || "Biografia / Descrição da empresa"}
          className="w-full px-4 py-2 rounded-md border shadow-sm resize-none focus:ring-2 focus:ring-green-500 text-black"
          rows={4}
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
        />

        <input
          type="text"
          placeholder={ibanDB || "IBAN"}
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500 text-black"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition duration-200"
        >
          Limpar Campos
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition duration-200"
        >
          Salvar Alterações
        </button>
      </div>
    </section>
  );
};

export default GeralSection;
