import { useState, useEffect } from "react";
import { contactoService } from "../../modules/service/api/contact";

type Contato = {
  id: string;
  nome: string;
  email: string;
  mensagem: string;
  createAt?: string;
};

function Contacts() {
  const [contacto, setContacto] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const [contatoSelecionado, setContatoSelecionado] = useState<Contato | null>(null);

  useEffect(() => {
    buscarContatos();
  }, []);

  async function buscarContatos() {
    try {
      const response = await contactoService.getAll();
      setContacto(response.data);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        📬 Mensagens de Contacto
      </h2>

      {loading ? (
        <p className="text-gray-600">Carregando mensagens...</p>
      ) : contacto.length === 0 ? (
        <p className="text-gray-600">Nenhuma mensagem encontrada.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mensagem</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
                <th className="px-4 py-3 text-sm"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacto.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">{c.nome}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {c.mensagem.length > 50 ? `${c.mensagem.slice(0, 50)}...` : c.mensagem}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {c.createAt ? new Date(c.createAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      type="button"
                      onClick={() => setContatoSelecionado(c)}
                      className="text-blue-600 hover:underline"
                    >
                      Ver mais
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {contatoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">📨 Mensagem completa</h3>
            <p><span className="font-semibold">Nome:</span> {contatoSelecionado.nome}</p>
            <p><span className="font-semibold">Email:</span> {contatoSelecionado.email}</p>
            <p className="mt-4"><span className="font-semibold">Mensagem:</span></p>
            <p className="text-gray-700 whitespace-pre-line mt-1">{contatoSelecionado.mensagem}</p>
            <p className="mt-4 text-sm text-gray-500">
              Enviado em: {contatoSelecionado.createAt ? new Date(contatoSelecionado.createAt).toLocaleString() : "—"}
            </p>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={() => setContatoSelecionado(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
