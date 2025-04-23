// sections/GeralSection.tsx
import { useEffect, useRef, useState } from 'react';
import pic from '../../assets/default-avatar-profile-picture-male-icon.png';

const GeralSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [tipoEmpresaId, setTipoEmpresaId] = useState('');
  const [nif, setNif] = useState('');
  const [site, setSite] = useState('');
  const [tiposEmpresa, setTiposEmpresa] = useState<{ id: string; nome: string }[]>([]);

  useEffect(() => {
    // Simulação: você deve buscar isso da API real
    setTiposEmpresa([
      { id: '1', nome: 'Tecnologia' },
      { id: '2', nome: 'Serviços' },
      { id: '3', nome: 'Comércio' },
    ]);
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePic(URL.createObjectURL(file));
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

        <select
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
        </select>

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
    </section>
  );
};

export default GeralSection;
