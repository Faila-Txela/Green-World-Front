import { useState, useEffect } from 'react';
import image1 from '../../../assets/dashboard.png';
import video1 from '../../../assets/video/greenWorld.mp4';

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
  const [visivel, setVisivel] = useState<boolean>(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setVisivel(false);

      setTimeout(() => {
        setIndiceAtual((prev) => (prev + 1) % midias.length);
        setVisivel(true); 
      }, 500);
      
    }, 5000); 

    return () => clearInterval(intervalo);
  }, []);

  const midiaSelecionada = midias[indiceAtual];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4">
      <div className="relative w-full max-w-5xl aspect-[16/10] md:aspect-video flex items-center justify-center">
        
        {/* Fundo Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-green-400 to-red-400 rounded-[2rem] shadow-2xl opacity-90" />

        {/* Container da Mídia */}
        <div 
          className={`relative z-10 w-full h-full flex justify-center p-4 md:p-10 transition-opacity duration-500 ease-in-out ${
            visivel ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {midiaSelecionada.tipo === 'imagem' ? (
            <img
              src={midiaSelecionada.url}
              alt="Preview"
              className="h-full w-full object-contain"
            />
          ) : (
            <video
              src={midiaSelecionada.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}