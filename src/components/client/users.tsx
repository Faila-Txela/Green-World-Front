import { useEffect, useState } from "react";
import { userService } from "../../modules/service/api/user";
import Toast from "../../components/ui/Toast";

type User = {
  id: number;
  nome: string;
  email: string;
  status: string; // Pode ser "ativo", "inativo", etc.
};

function Users() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [modalConfirmacao, setModalConfirmacao] = useState<{ tipo: "remover"; id: number } | null>(null);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    try {
      const response = await userService.getAll();
      console.log("Resposta da API:", response);
  
      // Garantir que a resposta seja um array
      const usuariosData = Array.isArray(response.data) ? response.data : [];
      
      console.log("Usuários:", usuariosData);
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsuarios([]); // Garantir que o estado seja sempre um array vazio em caso de erro
    }
  }  

  async function adicionarUsuario() {
    if (!novoNome.trim() || !novoEmail.trim()) return;
    await userService.create({ 
      nome: novoNome, 
      email: novoEmail, 
      senha: "defaultSenha", 
      tipoUser_id: "", 
      iban: "defaultIban", 
      nome_titular: "defaultTitular" 
    });
    setNovoNome("");
    setNovoEmail("");
    buscarUsuarios();
  }

  async function confirmarRemover(id: number) {
    await userService.delete(id.toString());
    setModalConfirmacao(null);
    buscarUsuarios();
  }

  return (
    <div className="rounded shadow-md p-3 mt-20">
      <h3 className="text-lg font-semibold mb-2">Usuários</h3>

      {/* Adicionar Usuário */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Nome do usuário"
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="email"
          value={novoEmail}
          onChange={(e) => setNovoEmail(e.target.value)}
          placeholder="Email do usuário"
          className="border px-2 py-1 rounded w-full"
        />
        <button onClick={adicionarUsuario} className="bg-green-600 text-white px-3 py-1 rounded">
          Adicionar
        </button>
      </div>

      {/* Listagem de Usuários */}
      <ul className="space-y-2">
        {usuarios.map((user) => (
          <li key={user.id} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
            <span>{user.nome} - {user.email}</span>
            <button
              onClick={() => setModalConfirmacao({ tipo: "remover", id: user.id })}
              className="text-red-600"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      {/* Modal de confirmação */}
      {modalConfirmacao && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4">
              Tens a certeza que queres remover este usuário?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded"
                onClick={() => setModalConfirmacao(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded"
                onClick={() => confirmarRemover(modalConfirmacao.id)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
