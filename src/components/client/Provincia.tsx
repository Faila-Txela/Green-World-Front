import { useEffect, useState } from "react";
import { provinciaService } from "../../modules/service/api/provincia"; 

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
      <h3 className="text-lg font-semibold mb-2">Províncias</h3>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={novaProvincia}
          onChange={(e) => setNovaProvincia(e.target.value)}
          placeholder="Nova província"
          className="border px-2 py-1 rounded w-full"
        />
        <button onClick={adicionarProvincia} className="bg-green-600 text-white px-3 py-1 rounded">
          Adicionar
        </button>
      </div>

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
                    onClick={() => {
                      setEditandoId(prov.id);
                      setNomeEditado(prov.nome);
                    }}
                    className="text-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmarAcao("remover", prov.id, prov.nome)}
                    className="text-red-600"
                  >
                    Remover
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalVisible && acaoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
            <p className="mb-4">
              Tem certeza que deseja {acaoModal.tipo === "remover" ? "remover" : "atualizar"} a província <strong>{acaoModal.nome}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalVisible(false)} className="px-3 py-1 bg-gray-300 rounded">
                Cancelar
              </button>
              <button onClick={executarAcaoConfirmada} className="px-3 py-1 bg-red-600 text-white rounded">
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