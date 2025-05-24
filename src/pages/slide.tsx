import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image1 from '../assets/11.png';
import video1 from '../assets/video/Green World.mp4'

type Midia = {
  id: number;
  tipo: 'imagem' | 'video';
  url: string;
};

const midias: Midia[] = [
  { id: 1, tipo: 'imagem', url: image1 },
  { id: 2, tipo: 'video', url: video1 },
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
              alt="Green Wolrd Celular"
              className="max-h-[65vh] object-contain rounded-xl shadow-lg transition-transform duration-500"
            />
          ) : (
            <video
              src={midiaSelecionada.url}
              controls
              autoPlay
              muted
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
