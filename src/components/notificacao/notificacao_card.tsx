interface NotificacaoCardProps {
  titulo: string;
  mensagem: string;
  data: Date;
  lida?: boolean;
  onMarcarComoLida?: () => void;
}

export default function NotificacaoCard({
  titulo,
  mensagem,
  data,
  lida = false,
  onMarcarComoLida,
}: NotificacaoCardProps) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md transition duration-300 border ${
        lida ? "bg-gray-100 border-gray-300" : "bg-white border-green-200"
      }`}
    >
      <h3 className={`text-xl font-semibold ${lida ? "text-gray-600" : "text-gray-800"}`}>
        {titulo}
      </h3>

      <p className={`mt-2 ${lida ? "text-gray-500" : "text-gray-700"}`}>{mensagem}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-400">
          {new Date(data).toLocaleString("pt-BR")}
        </span>

        {!lida && onMarcarComoLida && (
          <button
            type="button"
            onClick={onMarcarComoLida}
            className="text-green-700 hover:text-green-600 text-sm font-medium transition duration-150 ease-in-out"
          >
            Marcar como lida
          </button>
        )}
      </div>
    </div>
  );
}
