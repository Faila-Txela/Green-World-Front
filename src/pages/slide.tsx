import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Midia = {
  id: number;
  tipo: 'imagem' | 'video';
  url: string;
};

const midias: Midia[] = [
  { id: 1, tipo: 'imagem', url: 'src/assets/sistema1.png' },
  { id: 2, tipo: 'imagem', url: 'src/assets/11.png' },
  { id: 4, tipo: 'video', url: 'src/assets/video/Green World - Google Chrome 2025-02-09 21-49-00.mp4' },
];

export default function Slide() {
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const midiaSelecionada = midias[indiceAtual];

  const irParaAnterior = () => {
    setIndiceAtual((prev) => (prev - 1 + midias.length) % midias.length);
  };

  const irParaProximo = () => {
    setIndiceAtual((prev) => (prev + 1) % midias.length);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-lg md:text-3xl font-bold mb-8 text-center text-green-700">Sistema Green World</h2>

      <div className="flex items-center justify-between gap-6">
        <button
          type='button'
          title="Anterior"
          onClick={irParaAnterior}
          className="p-4 rounded-full bg-green-100 hover:bg-green-200 transition-colors shadow-md"
        >
          <FaChevronLeft size={28} className="text-green-700" />
        </button>

        <div className="flex-1 max-h-[70vh] flex items-center justify-center p-4 transition-all duration-500 ease-in-out">
          {midiaSelecionada.tipo === 'imagem' ? (
            <img
              src={midiaSelecionada.url}
              alt="Imagem ampliada"
              className="max-h-[65vh] object-contain rounded-xl shadow-lg transition-transform duration-500"
            />
          ) : (
            <video
              src={midiaSelecionada.url}
              controls
              className="max-h-[65vh] object-contain rounded-xl shadow-lg transition-transform duration-500"
            />
          )}
        </div>

        <button
          type='button'
          title="Próximo"
          onClick={irParaProximo}
          className="p-4 rounded-full bg-green-100 hover:bg-green-200 transition-colors shadow-md"
        >
          <FaChevronRight size={28} className="text-green-700" />
        </button>
      </div>
    </div>
  );
}
