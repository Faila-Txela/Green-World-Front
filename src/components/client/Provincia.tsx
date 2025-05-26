import { useEffect, useState } from "react";
import { provinciaService } from "../../modules/service/api/provincia"; 
import { FaCity } from 'react-icons/fa'
import { MdOutlineLocationOff } from 'react-icons/md';

type Provincia = {
  id: number;
  nome: string;
};

function ProvinceSettings() {
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [novaProvincia, setNovaProvincia] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [acaoModal, setAcaoModal] = useState<null | {
  tipo: "remover" | "atualizar";
  id: number;
  nome: string;
}>(null);


  useEffect(() => {
    buscarProvincias();
  }, []);

  async function buscarProvincias() {
    const data = await provinciaService.getAll();
    setProvincias(data);
  }

  async function adicionarProvincia() {
    if (!novaProvincia.trim()) return;
    await provinciaService.create({ nome: novaProvincia });
    setNovaProvincia("");
    buscarProvincias();
  }

  async function deletarProvincia(id: number) {
    await provinciaService.delete(id.toString());
    buscarProvincias();
  }

  async function actualizarProvincia(id: number) {
    await provinciaService.update(id.toString(), { nome: nomeEditado });
    setEditandoId(null);
    buscarProvincias();
  }

  function confirmarAcao(tipo: "remover" | "atualizar", id: number, nome: string) {
    setAcaoModal({ tipo, id, nome });
    setModalVisible(true);
  }

  async function executarAcaoConfirmada() {
    if (!acaoModal) return;
  
    if (acaoModal.tipo === "remover") {
      await deletarProvincia(acaoModal.id);
    } else if (acaoModal.tipo === "atualizar") {
      await actualizarProvincia(acaoModal.id);
    }
  
    setModalVisible(false);
    setAcaoModal(null);
  }
  

  return (
    <div className="rounded shadow-md p-3 mt-20">
      {/* Título da página */}
      <div className="flex items-center gap-3 mb-8">
      <FaCity className="h-9 w-9 text-green-600 animate-pulse" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel das Províncias</h1>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={novaProvincia}
          onChange={(e) => setNovaProvincia(e.target.value)}
          placeholder="Nova província"
          className="border px-2 py-1 rounded w-full"
        />
        <button
        type="button" 
        onClick={adicionarProvincia}
        className="bg-green-600 text-white px-3 py-1 rounded">
          Adicionar
        </button>
      </div>

{provincias.length === 0 ? (
  <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
    <MdOutlineLocationOff className="text-5xl text-gray-400" />
    <p className="text-center">Nenhuma província encontrada no momento.</p>
  </div>
) : (
  <ul className="space-y-2">
    {provincias.map((prov) => (
      <li key={prov.id} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
        {editandoId === prov.id ? (
          <>
            <input
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
              className="border px-2 py-1 rounded w-full mr-2"
              placeholder="Editar nome da província"
            />
            <button
              type="button"
              onClick={() => confirmarAcao("atualizar", prov.id, nomeEditado)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Salvar
            </button>
          </>
        ) : (
          <>
            <span>{prov.nome}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditandoId(prov.id);
                  setNomeEditado(prov.nome);
                }}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all duration-300"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => confirmarAcao("remover", prov.id, prov.nome)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-all duration-300"
              >
                Excluir
              </button>
            </div>
          </>
        )}
      </li>
    ))}
  </ul>
)}


      {/* Modal */}
      {modalVisible && acaoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-md">

            <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
            <p className="mb-4">
              Tem certeza que deseja {acaoModal.tipo === "remover" ? "remover" : "atualizar"} a província <strong>{acaoModal.nome}</strong>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button" 
                onClick={() => setModalVisible(false)}
                className="px-3 py-1 bg-gray-300 rounded">
                Cancelar
              </button>

              <button
                type="button" 
                onClick={executarAcaoConfirmada}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-all duration-300">
                Confirmar
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProvinceSettings;