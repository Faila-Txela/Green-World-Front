
interface NotificacaoCardProps {
  titulo: string;
  descricao: string;
  data: Date;
}

export default function NotificacaoCard({ titulo, descricao, data }: NotificacaoCardProps) {
  return (
    <div className="bg-white p-4 gap-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{titulo}</h3>
      <p className="text-gray-600 mt-2">{descricao}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">{new Date(data).toLocaleString()}</span>
        <button type="button" className="text-green-800 hover:text-green-700 text-sm font-medium transition duration-150 ease-in-out">
          Marcar como lida
        </button>
      </div>
    </div>
  );
}
