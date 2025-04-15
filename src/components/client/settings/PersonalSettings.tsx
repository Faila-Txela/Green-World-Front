import { useState, useRef } from 'react';
import PrimaryButton from '../../ui/PrimaryButton';
import { MdOutlineSettings } from 'react-icons/md';
import pic from '../../../assets/default-avatar-profile-picture-male-icon.png';

interface ProfileProps {
  onChangeProfilePic: (newProfilePic: File) => void;
  onChangeTheme: () => void;
  onDeleteAccount: () => void;
}

const Settings: React.FC<ProfileProps> = ({ onChangeProfilePic, onChangeTheme, onDeleteAccount }) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [biography, setBiography] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      onChangeProfilePic(file);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    onChangeTheme();
  };

  const handleSaveChanges = () => setIsModalOpen(true);
  const confirmSaveChanges = () => {
    console.log("Alterações Salvas");
    setIsModalOpen(false);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteAccount = () => setIsDeleteModalOpen(true);
  const confirmDeleteAccount = () => {
    onDeleteAccount();
    setIsDeleteModalOpen(false);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} flex flex-col items-center px-4 pb-12`}>
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mt-16 mb-6">
        <MdOutlineSettings className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-semibold">Painel de Configurações da Empresa</h1>
      </div>

      {/* Foto e Bio */}
      <section className="w-full max-w-2xl bg-white dark:bg-gray-50 shadow-md rounded-2xl p-6 mb-6 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4">Foto e Biografia</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-20 h-20">
            <img
              src={profilePic || pic}
              alt="Profile"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full w-full h-full object-cover border-2 border-green-800 cursor-pointer hover:opacity-80 transition"
            />
            <input
              title='file'
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <textarea
          placeholder="Fale um pouco sobre você"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          rows={4}
        />
      </section>

      {/* Botões Ações */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <PrimaryButton name={isDarkTheme ? 'Tema Claro' : 'Tema Escuro'} onClick={toggleTheme} addClassName="bg-blue-600 hover:bg-blue-700 px-10" />
        <PrimaryButton name="Salvar Alterações" onClick={handleSaveChanges} addClassName="bg-green-600 hover:bg-green-700 px-10" />
      </div>

      {/* Exclusão de Conta */}
      <section className="w-full max-w-2xl bg-white dark:bg-gray-50 shadow-md rounded-2xl p-6 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4">Excluir Conta</h3>
        <p className="text-sm mb-2">Antes de excluir sua conta, leia as informações abaixo:</p>
        <ul className="text-sm list-disc pl-4 mb-4">
          <li>Todos os seus dados serão apagados e não poderão ser recuperados.</li>
          <li>Você precisará criar uma nova conta para usar a Green World novamente.</li>
        </ul>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="accent-green-600"
          />
          <span className="text-sm">Eu li as normas e desejo continuar com a exclusão.</span>
        </label>

        <PrimaryButton
          name="Excluir Conta"
          onClick={handleDeleteAccount}
          addClassName={`bg-red-600 hover:bg-red-700 px-10 ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isChecked}
        />
      </section>

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-center">Tem certeza que deseja excluir sua conta?</h3>
            <div className="flex justify-between gap-4">
              <button
                onClick={confirmDeleteAccount}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Excluir
              </button>
              <button
                onClick={closeDeleteModal}
                className="w-full py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>  );
};

export default Settings;
