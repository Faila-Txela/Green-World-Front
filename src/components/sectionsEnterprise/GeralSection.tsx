// sections/GeralSection.tsx
import { useEffect, useRef, useState } from 'react';
import Toast from "../../components/ui/Toast";
import axios from "../../lib/axios";
import pic from '../../assets/default-avatar-profile-picture-male-icon.png';

const GeralSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  //const [tipoEmpresaId, setTipoEmpresaId] = useState('');
  const [nif, setNif] = useState('');
  const [site, setSite] = useState('');
  //const [tiposEmpresa, setTiposEmpresa] = useState<{ id: string; nome: string }[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [typeGarbages, setTypeGarbages] = useState<Municipio[]>([]);
  const [typeGarbage, setTypeGarbage] = useState<string>("");

  useEffect(() => {
  //   // Simulação: você deve buscar isso da API real
  //   setTiposEmpresa([
  //     { id: '1', nome: 'Reciclagem' },
  //     { id: '2', nome: 'Aterros Sanitários' },
  //     { id: '3', nome: 'Catadores' },
  //   ]);
   }, []);

  const handleSave = () => {
    // Enviar para a API
    console.log({ nome, biografia, nif, profilePic });
    alert('Alterações salvas com sucesso!');
  };

  const handleClear = () => {
    setNome('');
    setBiografia('');
    setNif('');
    setProfilePic(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

    // Função para pegar os tipos de empresa
    const fetchTypeGarbages = async () => {
      const response = await axios.get("/tipo-empresa");
      if (response.status === 200) {
        setTypeGarbages(response.data);
      }
    };

    useEffect(() => {
      fetchTypeGarbages();
    }, []);

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
        <input type="file" title='image' accept="image/*" ref={fileInputRef} onChange={handleProfilePicChange} className="hidden text-black" />
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nome da Empresa"
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500 text-black"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <textarea
          placeholder="Biografia / Descrição da empresa"
          className="w-full px-4 py-2 rounded-md border shadow-sm resize-none focus:ring-2 focus:ring-green-500 text-black"
          rows={4}
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
        />

        {/* <select
          title='Tipo de empresa'
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500 text-black"
          value={tipoEmpresaId}
          onChange={(e) => setTipoEmpresaId(e.target.value)}
        >
          <option value="" className='text-black'>Selecione o tipo de empresa</option>
          {tiposEmpresa.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nome}
            </option>
          ))}
        </select> */}

<div>
            <label
              htmlFor="tipoEmpresa"
              className="font-semibold mb-2 block text-gray-600"
            >
              Com que você trabalha ?
            </label>

            <select
            className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              value={typeGarbage}
              autoComplete="on"
              onChange={(e) => setTypeGarbage(e.target.value)}
              title="Selecione a sua área de actuação"
            >
              <option value="" key="" className="">Selecione a sua área de actuação</option>
              {typeGarbages.map((typeGarbage) => (
                <option value={typeGarbage.id}>{typeGarbage.nome}</option>
              ))}
            </select>
          </div>

        <input
          type="text"
          placeholder="NIF"
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500 text-black"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
        />

        <input
          type="url"
          placeholder="Site oficial"
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-green-500 text-black"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4 mt-5">
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
 
      {/* Exibe o Toast se houver mensagem */}
      {toast && <Toast message={toast.message}
       type={toast.type} 
       onClose={() => setToast(null)} />}

    </section>
  );
};

export default GeralSection;
