import { useState, useRef } from 'react';
import PrimaryButton from '../../ui/PrimaryButton';
import { MdOutlineSettings } from 'react-icons/md';
import pic from '../../../assets/default-avatar-profile-picture-male-icon.png';

interface ProfileProps {
  onChangeProfilePic: (newProfilePic: File) => void;
  onChangeTheme: () => void;
  onDeleteAccount: () => void; // Função para excluir a conta
}

const Settings: React.FC<ProfileProps> = ({ onChangeProfilePic, onChangeTheme, onDeleteAccount }) => {
  const [profilePic, setProfilePic] = useState<string | null>(null); // Armazenando a imagem de perfil
  const [name, setName] = useState<string>(''); // Armazenando o nome do usuário
  const [biography, setBiography] = useState<string>(''); // Biografia
  const [instagram, setInstagram] = useState<string>(''); // Link do Instagram
  const [website, setWebsite] = useState<string>(''); // Link do site pessoal
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Para alternar o tema
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar a exibição do modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Para o modal de exclusão
  const [isChecked, setIsChecked] = useState(false); // Estado para o checkbox de exclusão
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Função para lidar com a mudança da foto de perfil
  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); 
      onChangeProfilePic(file);
    }
  };

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    onChangeTheme(); 
  };

  // Função para abrir o modal de salvar alterações
  const handleSaveChanges = () => {
    setIsModalOpen(true);
  };

  // Função para salvar as alterações
  const confirmSaveChanges = () => {
    console.log("Alterações Salvas");
    setIsModalOpen(false);
  };

  // Função para fechar o modal sem salvar
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para abrir o modal de excluir conta
  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  // Função para confirmar a exclusão da conta
  const confirmDeleteAccount = () => {
    onDeleteAccount(); // Chama a função passada como prop para excluir a conta
    setIsDeleteModalOpen(false);
  };

  // Função para cancelar a exclusão
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'} flex flex-col items-center justify-center gap-12 mt-16`}>
      {/* Texto explicativo da tela */}
      <div className="flex items-center p-4 gap-3 absolute top-20 left-72">
        <MdOutlineSettings className="h-9 w-9" />
        <h1 className="text-xl md:text-2xl font-semibold text-left">Painel de Configurações da Empresa</h1>
      </div>

      <div className='flex justify-start mt-16'>
        <h3 className='font-semibold text-lg'>Foto e Biografia</h3>
      </div>
      <div className="shadow-md bg-gray-50 p-6 rounded-lg w-1/2">
        {/* Foto de perfil */}
        <div className="flex items-center justify-center mb-4">
          <div
            className="flex items-center justify-center rounded-full bg-gray-300 w-20 h-20 cursor-pointer"
            onClick={() => fileInputRef.current?.click()} // Clica no input file ao clicar na foto de perfil
          >
            <img
              src={profilePic || pic} // Exibe a imagem atual ou uma imagem padrão
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden" 
            title="Selecione uma nova foto de perfil" 
          />
        </div>

        {/* Nome de perfil */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nome de perfil</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            placeholder="Digite seu nome"
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Biografia */}
        <div className="mb-4">
          <label htmlFor="biography" className="block text-gray-700">Biografia</label>
          <textarea
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Fale um pouco sobre você"
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Links */}
      <div className='flex justify-start'>
        <h3 className='font-semibold text-lg'>Links</h3>
      </div>

      <div className='shadow-md bg-gray-100 items-center justify-center p-6 rounded-lg w-1/2'>
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-gray-700">Instagram</label>
          <input
            id="instagram"
            type="url"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)} 
            placeholder="Link do Instagram"
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="website" className="block text-gray-700">Website</label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)} 
            placeholder="Link do site pessoal"
            className="mt-2 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Alternar Tema */}
      <div className='flex items-center justify-center gap-12'>
        <div className="flex items-center justify-between mt-6">
          <PrimaryButton name={isDarkTheme ? 'Tema Claro' : 'Tema Escuro'} onClick={toggleTheme} addClassName='bg-blue-700 hover:bg-blue-800 px-16' />
        </div>

        {/* Botão para salvar alterações */}
        <div className="flex items-center justify-between mt-6">
          <PrimaryButton name='Salvar Alterações' onClick={handleSaveChanges} addClassName='bg-green-700 px-16' />
        </div>
      </div>

      {/* Excluir conta */}
      <div className='flex justify-start'>
        <h3 className='font-semibold text-lg'>Conta</h3>
      </div>
      <div className='shadow-md bg-gray-100 flex flex-col items-center justify-center p-10 rounded-lg w-1/2 mt-12'>
        <div className='flex flex-col gap-6 justify-start text-left p-3'>
          <p>Antes de excluir sua conta,pedimos que tome um pouco de seu tempo para ler algumas notas,que serão deixadas no texto abaixo.</p>
          <p className='font-medium text-sm'>▪️ Ao excluir sua conta saiba que todos os seus dados serão apagados e você não terá como voltar a recuperá-los.</p>
          <p className='font-medium text-sm'>▪️ Você terá que criar uma outra conta para poder usufruir dos serviços da Green World novamente,caso queira.</p>
        </div>

        {/* Checkbox para confirmar a exclusão */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor="confirmDelete" className="text-sm">
            Eu li as normas e decido continuar com o processo de exclusão da minha conta.
          </label>
        </div>

        {/* Botão para excluir conta */}
        <div className="flex items-center justify-between mt-6">
          <PrimaryButton 
            name='Excluir Conta' 
            onClick={handleDeleteAccount} 
            addClassName={`bg-red-600 hover:bg-red-700 px-16 ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isChecked}
          />
        </div>
      </div>

      {/* Modal de confirmação */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-md">
            <h3 className="text-xl mb-4">Você tem certeza que deseja excluir sua conta?</h3>
            <div className="flex justify-between">
              <button
                onClick={confirmDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Excluir
              </button>
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;