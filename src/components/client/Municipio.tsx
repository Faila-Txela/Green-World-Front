import { useEffect, useState } from "react";
import { municipioService } from "../../modules/service/api/municipio";

type Municipio = {
  id: number;
  nome: string;
};

function Municipio() {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [novoMunicipio, setNovoMunicipio] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [modalConfirmacao, setModalConfirmacao] = useState<{ tipo: "remover" | "editar"; id: number } | null>(null);

  useEffect(() => {
    buscarMunicipios();
  }, []);

  async function buscarMunicipios() {
    const data = await municipioService.getAll();
    setMunicipios(data);
  }

  async function adicionarMunicipio() {
    if (!novoMunicipio.trim()) return;
    await municipioService.create({ nome: novoMunicipio });
    setNovoMunicipio("");
    buscarMunicipios();
  }

  async function confirmarRemover(id: number) {
    await municipioService.delete(id.toString());
    setModalConfirmacao(null);
    buscarMunicipios();
  }

  async function confirmarEditar(id: number) {
    await municipioService.update(id.toString(), { nome: nomeEditado });
    setEditandoId(null);
    setModalConfirmacao(null);
    buscarMunicipios();
  }

  return (
    <div className="rounded shadow-md p-3 mt-20">
      <h3 className="text-lg font-semibold mb-2">Municípios</h3>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={novoMunicipio}
          onChange={(e) => setNovoMunicipio(e.target.value)}
          placeholder="Novo município"
          className="border px-2 py-1 rounded w-full"
        />
        <button
          type="button"
          onClick={adicionarMunicipio}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {municipios.map((municipio) => (
          <li key={municipio.id} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
            {editandoId === municipio.id ? (
              <>
                <input
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                  className="border px-2 py-1 rounded w-full mr-2"
                  placeholder="Editar nome do município"
                />
                <button
                  onClick={() =>
                    setModalConfirmacao({ tipo: "editar", id: municipio.id })
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                <span>{municipio.nome}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                    setEditandoId(municipio.id);
                    setNomeEditado(municipio.nome);
                    }}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-all duration-300"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalConfirmacao({ tipo: "remover", id: municipio.id })}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-600 transition-all duration-300"
                  >
                    Remover
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modal de confirmação */}
      {modalConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">

            <p className="mb-4">
              Tens a certeza que queres{" "}
              {modalConfirmacao.tipo === "remover" ? "remover" : "editar"} este município?
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setModalConfirmacao(null)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="bg-red-600 text-white px-3 py-1 rounded tarnsition-all duration-300"
                onClick={() => {
                  modalConfirmacao.tipo === "remover"
                    ? confirmarRemover(modalConfirmacao.id)
                    : confirmarEditar(modalConfirmacao.id);
                }}
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

export default Municipio;

