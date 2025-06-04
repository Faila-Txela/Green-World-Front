import { useState, useEffect } from "react";
import { contactoService } from "../../modules/service/api/contact";
import { MdPhone } from "react-icons/md";

type Contato = {
  id: string;
  nome: string;
  email: string;
  mensagem: string;
  createAt?: string;
  respondido: boolean;
};

function Contacts() {
  const [contacto, setContacto] = useState<Contato[]>([]);
  const [resposta, setResposta] = useState("");
  const [enviando, setEnviando] = useState(false);
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


async function enviarResposta() {
  if (!contatoSelecionado) return;

  try {
    setEnviando(true);
    await contactoService.sendReply({
      email: contatoSelecionado.email,
      subject: "Resposta ao seu contacto com o Green World",
      message: resposta,
    });

    alert("Resposta enviada com sucesso!");
    setContatoSelecionado(null);
    setResposta("");
  } catch (error) {
    console.error("Erro ao enviar resposta:", error);
    alert("Erro ao enviar resposta. Tente novamente.");
  } finally {
    setEnviando(false);
  }
}


  return (
    <div className="flex flex-col h-screen px-8 py-20">
      {/* Título da página */}
      <div className="flex items-center gap-3 mb-8">
        <MdPhone className="h-9 w-9 text-green-600 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel de Mensagens de Contacto</h1>
      </div>

      {loading ? (
        <p className="text-gray-600">Carregando mensagens...</p>
      ) : contacto.length === 0 ? (
        <p className="text-gray-600">Nenhuma mensagem encontrada.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 shadow hover:shadow-lg transition-all duration-300 rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr className="">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mensagem</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
                <th className="px-4 py-3 text-sm"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacto.map((c) => (
                <tr key={c.id} className="hover:bg-green-100 transition-all duration-150">
                  <td className="px-4 py-3 text-sm text-gray-800">{c.nome}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {c.mensagem.length > 50 ? `${c.mensagem.slice(0, 50)}...` : c.mensagem}
                  </td>
                  <td className="px-4 py-3 text-sm">
                  {c.respondido ? (
                  <span className="text-green-600 font-medium">Respondido</span>
                   ) : (
                 <span className="text-yellow-600 font-medium">Pendente</span>
                   )}
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

    <p className="mt-2">
      <span className="font-semibold">Status:</span>{" "}
      {contatoSelecionado.respondido ? (
        <span className="text-green-600 font-medium">Respondido</span>
      ) : (
        <span className="text-yellow-600 font-medium">Pendente</span>
      )}
    </p>

      {/* Campo para escrever a resposta */}
      <div className="mt-6">
        <label htmlFor="resposta" className="block text-sm font-medium text-gray-700 mb-1">
          Sua resposta:
        </label>
        <textarea
          id="resposta"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-400"
          rows={4}
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
        />
      </div>

      {/* Botões */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setContatoSelecionado(null)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={enviarResposta}
          disabled={!resposta.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          Enviar Resposta
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Contacts;
