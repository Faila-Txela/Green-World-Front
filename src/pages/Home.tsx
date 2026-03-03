import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useNavigate, Link } from "react-router-dom";
import PrimaryButton from "../components/ui/PrimaryButton";
import banner from "../assets/banner-hero.png"
import video from '../assets/video/coletaSelectiva.mp4';
import image from '../assets/world.png'
import image2 from '../assets/coleta.jpg';
import video2 from '../assets/video/catadores.mp4';
import image4 from '../assets/carta.jpg';
import CardBeneficios from "../components/Vantagens";
import RelatosResolvidos from "../components/RelatosResolvidos";
import { motion } from "framer-motion"; 
import Slide from "../components/slide";
import { faqs } from "../data/models"
import { FloatingBadge } from "../components/FloatingBadge";

interface ModalProps {
  item: {
    type: "image" | "video" | "item"
    src: string
    title: string
    item: string
    description: string
    time: string
  };
  onClose: () => void
}

  function Modal({ item, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
         type="button"
         onClick={onClose} 
         className="absolute top-2 right-2 text-gray-600 hover:text-red-600">
          ✖
         </button>

        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
        {item.type === "image" ? (
          <img src={item.src} alt={item.title} className="w-full rounded-md" />
        ) : (
          <video src={item.src} controls className="w-full rounded-md" />
        )}
        <p className="mt-2 text-gray-700">{item.description}</p>
        <p className="text-sm text-gray-500">Publicado: {item.time}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<ModalProps['item'] | null>(null);
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  const midiaItens: ModalProps['item'][] = [
      { type: "image", src: image2, title: "Coleta Seletiva", description: "A importância da separação correta dos resíduos.", item: "item1", time: "2h atrás" },
      { type: "video", src: video, title: "Processo de Reciclagem", description: "Como funciona a coleta seletiva em Luanda.", item: "item2", time: "4h atrás" },
      { type: "image", src: image4, title: "Carta aos Catadores", description: "O papel dos catadores na limpeza urbana.", item: "item3", time: "1 dia atrás" },
      { type: "video", src: video2, title: "História dos Catadores", description: "A luta diária dos catadores de lixo.", item: "item4", time: "3 dias atrás" },
  ];

  return (
    <div>
      
     <Header />
 
{/* Seção: Hero */}
<motion.section
  className="
    relative
    min-h-screen
    flex items-center
    justify-center
    px-6 md:px-12 lg:px-20
    py-16
    overflow-hidden
  "
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  {/* Badges */}
  <div className="absolute inset-0 z-10 pointer-events-none mt-6">

    <FloatingBadge
      className="top-20 left-8 md:top-24 md:left-20 animate-floatSlow [animation-delay:0.6s]"
    >
      🌍
    </FloatingBadge>

    <FloatingBadge
      className="top-40 right-10 md:top-32 md:right-32 animate-float [animation-delay:1s]"
    >
      ★★★★★
    </FloatingBadge>

    <FloatingBadge
      className="bottom-32 left-12 md:bottom-40 md:left-40 animate-floatSlow [animation-delay:0.8s]"
    >
      ♻️
    </FloatingBadge>

    <FloatingBadge
      className="bottom-20 right-6 md:bottom-32 md:right-24 animate-float [animation-delay:0.5s]"
    >
      🌱
    </FloatingBadge>

  </div>

  {/* Conteúdo principal */}
  <div
    className="
      relative
      z-20
      w-full
      max-w-7xl
      grid
      md:grid-cols-2
      gap-16
      items-center
    "
  >
    {/* Texto */}
    <div className="flex flex-col gap-8 text-center md:text-left">
      <h1 className="font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Luanda mais limpa{" "}
        <span className="text-primary block text-4xl md:text-6xl">
          Começa com você!
        </span>
      </h1>

      <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto md:mx-0">
        Relate amontoados de lixo nas ruas e ajude a manter sua comunidade mais limpa.
      </p>

      <div className="w-full md:w-auto">
        <PrimaryButton
          name="Comece a relatar"
          addClassName="rounded-lg bg-primary hover:scale-105 text-white font-semibold px-8 py-4"
          onClick={() => navigate("/personal-login")}
        />
      </div>
    </div>

    {/* Imagem (desktop apenas) */}
    <div className="hidden md:flex justify-center">
      <img
        src={banner}
        className="w-full max-w-md lg:max-w-xl object-contain"
        alt="mulher com celular na mão"
      />
    </div>
  </div>
</motion.section>

    {/*Seção: About*/}
    <section className="bg-gray-50/50 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          
          <div className="absolute inset-0 scale-105 md:scale-110 opacity-70 blur-xl bg-gradient-to-br from-emerald-100 to-sky-100 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]" />
          
          <div className="relative z-10 w-full max-w-lg h-[400px] md:h-[550px] flex items-center justify-center 
           bg-white p-6 md:p-8 rounded-[40px_100px_40px_100px] shadow-2xl shadow-emerald-950/5 
            overflow-hidden border-2 border-emerald-50">
            
            <img 
              src={image} 
              className="w-[85%] h-auto object-contain transition-transform duration-500 hover:scale-105" 
              alt="Globo focado em Luanda" 
            />

            <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-emerald-400 opacity-60 animate-pulse" />
            <div className="absolute bottom-16 left-12 w-3 h-3 rounded-full bg-sky-400 opacity-50" />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start p-4">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#01402E] tracking-tight mb-8 md:mb-12">
            Sobre <span className="text-primary">Nós</span>
          </h2>
          
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-800">
            <p className="text-justify">
              A Green World é a plataforma que veio para revolucionar a gestão dos resíduos sólidos na cidade de Luanda.
            </p>
            
            <p className="text-justify">
              Desde já, mantemos nossa posição como agentes da oposição no quesito poluição ambiental.
            </p>
            
            <p className="text-justify text-gray-700 bg-emerald-50 p-5 rounded-2xl border-l-4 border-primary">
              Promovendo a igualdade de valores humanos, a natureza também merece ser tratada como um ser vivente, até porque ela o é.
            </p>
          </div>
          
          <div className="flex items-center">
           <PrimaryButton 
            name="Saiba Mais" 
            addClassName="px-24 mt-10 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full hover:scale-105"
            onClick={() => navigate("/news")}
           />
          </div>
      
        </div>

      </div>
    </section>

      <Slide />

      <CardBeneficios />

    <motion.section
            className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-50"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-6">Estado do saneamento em Luanda</h2>
              <p className="text-gray-600">
                Tenha as notícias sempre perto de si, sem precisar sair de casa.
              </p>
            </div>

          <section className="columns-2 md:columns-2 gap-2 space-y-6">
              {midiaItens.map((item, index) => (
              <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-md transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                >
                  {item.type === "image" ? (
                    <img className="w-full md:h-70 h-52 md:w-[32rem] rounded-md" src={item.src} alt={item.title} />
                  ) : (
                    <video className="w-full md:h-70 md:w-[32rem] rounded-md" src={item.src} autoPlay muted loop playsInline />
                  )}
                </motion.div>
              ))}
          </section>
          <Link to="/news" className="hover:underline transition delay-50 hover:text-green-800">Ver mais Notícias</Link>
    </motion.section>
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />} 

      <RelatosResolvidos />

    <section className="relative w-full h-[80vh] bg-[url('https://images.pexels.com/photos/3174349/pexels-photo-3174349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-fixed bg-center">
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <h2 className="text-white text-2xl md:text-4xl font-semibold p-20">UM POR TODOS, E TODOS ACABANDO O LIXO!</h2>
        </div>
    </section>


    <section className="p-6 md:px-16 flex flex-col md:flex-row justify-center mt-14 mb-16 gap-8">
        <div className="text-start w-full max-w-xl flex flex-col gap-8">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 text-sm">Tire suas dúvidas sobre a Green World</p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold">Ficou com dúvida?</span> <Link to="/contacts" className="text-primary underline">Entre em contacto</Link>
          </div>
        </div>
        
        <div className="w-full max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <button
                type="button"
                className="w-full flex justify-between items-center py-4 text-left text-lg font-medium hover:text-green-600 transition-colors"
                onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span className="text-green-600 text-2xl">{selectedFAQ === index ? "-" : "+"}</span>
              </button>
              {selectedFAQ === index && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-gray-600 pb-4 text-sm md:text-base leading-relaxed"
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}