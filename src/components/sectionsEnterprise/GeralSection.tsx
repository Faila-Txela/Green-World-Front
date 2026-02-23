import { useEffect, useRef, useState } from 'react';
import Toast from "../../components/ui/Toast";
import axios from "../../lib/axios";
import pic from '../../assets/default-avatar-profile-picture-male-icon.png';

const GeralSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Campos preenchidos pelo usuário
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [nif, setNif] = useState('');
  const [site, setSite] = useState('');

  // Dados vindos da base
  const [nomeDB, setNomeDB] = useState('');
  const [biografiaDB, setBiografiaDB] = useState('');
  const [nifDB, setNifDB] = useState('');
  const [siteDB, setSiteDB] = useState('');

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const empresaId = localStorage.getItem("empresaId");

  useEffect(() => {
    axios.get(`/empresas/${empresaId}`).then(res => {
      const empresa = res.data;
      setNomeDB(empresa.nome || '');
      setBiografiaDB(empresa.biografia || '');
      setNifDB(empresa.nif || '');
      setSiteDB(empresa.site || '');
      setProfilePic(empresa.imagemPerfil || '');
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

      await axios.put(`/empresas/${empresaId}`, {
        nome: nome || nomeDB,
        biografia: biografia || biografiaDB,
        nif: nif || nifDB,
        site: site || siteDB,
        imagemPerfil,
      });

      setToast({ message: "Informações atualizadas com sucesso!", type: "success" });
      if (imagemPerfil) localStorage.setItem("empresaFoto", imagemPerfil);
    } catch (err) {
      console.error(err);
      setToast({ message: "Erro ao salvar as alterações", type: "error" });
    }
  };

  const handleClear = () => {
    setNome('');
    setBiografia('');
    setNif('');
    setSite('');
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
        <input title="image" type="file" accept="image/*" ref={fileInputRef} onChange={handleProfilePicChange} className="hidden" />
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder={nomeDB || "Nome da Empresa"}
          className="w-full px-4 py-2 rounded-md border text-black"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <textarea
          placeholder={biografiaDB || "Biografia"}
          className="w-full px-4 py-2 rounded-md border resize-none text-black"
          rows={4}
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
        />
        <input
          type="text"
          placeholder={nifDB || "NIF"}
          className="w-full px-4 py-2 rounded-md border text-black"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
        />
        <input
          type="url"
          placeholder={siteDB || "Site oficial"}
          className="w-full px-4 py-2 rounded-md border text-black"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-4 mt-5">
        <button onClick={handleClear} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md">Limpar Campos</button>
        <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-md">Salvar Alterações</button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
};

export default GeralSection;
