import { useEffect, useState } from "react";
import { userService } from "../../modules/service/api/user";
import { empresaService } from "../../modules/service/api/empresa";

type User = {
  id: number;
  nome: string;
  email: string;
};

type ModalConfirmacaoData = {
  tipo: "remover";
  id: number;
  userType: "comum" | "empresa";
};

function Users() {
  const [usuariosComuns, setUsuariosComuns] = useState<User[]>([]);
  const [empresas, setEmpresas] = useState<User[]>([]);
  const [modalConfirmacao, setModalConfirmacao] = useState<ModalConfirmacaoData | null>(null);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    try {
      const [resUsuarios, resEmpresas] = await Promise.all([
        userService.getAll(),
        empresaService.getAll(),
      ]);

      const usuarios = Array.isArray(resUsuarios.data) ? resUsuarios.data : [];
      const empresas = Array.isArray(resEmpresas.data) ? resEmpresas.data : [];

      setUsuariosComuns(usuarios);
      setEmpresas(empresas);
    } catch (error) {
      console.error("Erro ao buscar usuários ou empresas:", error);
      setUsuariosComuns([]);
      setEmpresas([]);
    }
  }

  async function confirmarRemover(id: number, userType: "comum" | "empresa") {
    try {
      if (userType === "comum") {
        await userService.delete(id.toString());
        setUsuariosComuns((prev) => prev.filter((u) => u.id !== id));
      } else {
        await empresaService.delete(id.toString());
        setEmpresas((prev) => prev.filter((u) => u.id !== id));
      }
      setModalConfirmacao(null);
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
    }
  }

  function TabelaUsuarios({ titulo, lista, tipo }: { titulo: string; lista: User[]; tipo: "comum" | "empresa" }) {
    return (
      <>
        {/* Título da página */}
        {/* <div className="flex items-center gap-3 mb-8">
        <FaUsers className="h-9 w-9 text-green-600 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel de Usuários</h1>
        </div> */}

        <h3 className="text-lg font-semibold mb-4 mt-10">{titulo}</h3>
        <table className="w-full text-left border-collapse mb-8 shadow hover:shadow-lg transition-all duration-300 rounded-xl">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border-b">Nome</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{user.nome}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b text-center">
                  <button
                    type="button"
                    onClick={() => setModalConfirmacao({ tipo: "remover", id: user.id, userType: tipo })}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-all duration-300"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {lista.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <div className="rounded shadow-md p-6 mt-20">
      <TabelaUsuarios titulo="Usuários Comuns" lista={usuariosComuns} tipo="comum" />
      <TabelaUsuarios titulo="Empresas" lista={empresas} tipo="empresa" />

      {modalConfirmacao && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
            <p className="mb-4 text-gray-800 font-medium">
              Tem a certeza que deseja excluir este usuário?
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                onClick={() => setModalConfirmacao(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={() =>
                  confirmarRemover(modalConfirmacao.id, modalConfirmacao.userType)
                }
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
