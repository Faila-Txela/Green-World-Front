import { useState } from 'react';
import { userService } from '../../modules/service/api/user';

const ExcluirConta = () => {
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const abrirModal = () => {
    if (checked) {
      setShowModal(true);
    }
  };

  const cancelar = () => {
    setSenha('');
    setErro('');
    setShowModal(false);
  };
  const confirmarExclusao = async () => {
    if (!senha.trim()) {
      setErro('Digite sua senha.');
      return;
    }
  
    try {
      setLoading(true);
      setErro('');
  
      // 1. Verifica a senha
      await userService.verifyPassword(senha);
  
      // 2. Faz logOut
      await userService.logOut();
  
      // 3. Excluir a conta
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setErro('ID do usuário não encontrado.');
        setLoading(false);
        return;
      }
      await userService.delete(userId);
  
      alert('Conta excluída com sucesso.');
      window.location.href = '/personal-login'; 
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        setErro('Senha incorreta.');
      } else {
        setErro('Erro ao excluir a conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };  

  return (
    <section className="min-h-screen mt-12 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-red-600">Excluir Conta</h2>

      <p>Essa ação é irreversível. Todos os dados da empresa serão permanentemente apagados.</p>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        Confirmo que desejo excluir minha conta.
      </label>

      <button
        type="button"
        onClick={abrirModal}
        className={`py-2 rounded-md text-white ${
          checked ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'
        }`}
        disabled={!checked}
      >
        Excluir Conta
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-center text-red-600">
              Confirme sua senha
            </h3>

            <p className="text-sm mb-4 text-center">
              Por segurança, digite sua senha para confirmar a exclusão da conta.
            </p>

           <div className="mb-4">
           <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {erro && <p className="text-sm text-red-600 mt-1">{erro}</p>}
           </div>

            <div className="flex justify-between gap-4">
              <button
                type='button'
                onClick={confirmarExclusao}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Confirmar Exclusão
              </button>

              <button
                type='button'
                onClick={cancelar}
                className="w-full py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExcluirConta;