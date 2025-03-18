import { useState, useEffect } from "react";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigate, Link } from "react-router-dom";
import video from '../assets/video/coletaSelectiva.mp4';
import image2 from '../assets/coleta.jpg';
import video2 from '../assets/video/catadores.mp4';
import image4 from '../assets/carta.jpg';
import imageFixed from '../assets/pexels-tomfisk-3174349.jpg';
import Card from "../components/Card";
import Map from "../components/Map";
import { motion } from "framer-motion"; // Importando framer-motion

// Importando componentes do react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Estilo do Leaflet
import L from 'leaflet'; // Importando para personalizar os ícones do marcador

export default function Home() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolling(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lista de FAQs
  const faqs = [
    {
      question: "Como posso relatar amontoados de lixo?",
      answer: "Você pode relatar amontoados de lixo diretamente pelo nosso sistema, acessando a área de relatórios no menu principal ou clicando no botão 'Comece a Relatar'.",
    },
    {
      question: "O que acontece com o lixo após o meu relatório?",
      answer: "Após o seu relatório, as empresas responsáveis pela coleta de lixo serão notificadas e tomarão as devidas providências para recolher e destinar o lixo corretamente.",
    },
    {
      question: "Posso acompanhar o status do meu relatório?",
      answer: "Sim! Você pode acompanhar o status do seu relatório diretamente na nossa plataforma, onde terá informações sobre o progresso da coleta.",
    },
    {
      question: "Como funciona a reciclagem na cidade?",
      answer: "A reciclagem é realizada por empresas especializadas que fazem a separação do material reciclável e destinam-no adequadamente para novos usos, ajudando a reduzir o impacto ambiental.",
    },
  ];

  const midiaItens = [
    { type: "image", src: image2, title: "Coleta Seletiva", description: "A importância da separação correta dos resíduos.", time: "2h atrás" },
    { type: "video", src: video, title: "Processo de Reciclagem", description: "Como funciona a coleta seletiva em Luanda.", time: "4h atrás" },
    { type: "image", src: image4, title: "Carta aos Catadores", description: "O papel dos catadores na limpeza urbana.", time: "1 dia atrás" },
    { type: "video", src: video2, title: "História dos Catadores", description: "A luta diária dos catadores de lixo.", time: "3 dias atrás" },
  ];

  const locationsData = [
    { name: "Centro da Cidade", relatos: 120, lat: -8.864, lon: 13.56 },
    { name: "Mutamba", relatos: 85, lat: -8.764, lon: 9.56 },
    { name: "Viana", relatos: 65, lat: -8.564, lon: 10.56 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Seção Inicial */}
      <motion.div 
        className="min-h-screen inset-shadow-sm rounded-sm flex md:flex-row flex-col items-center gap-6 px-4 pt-20 md:pt-32"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-center p-5">
            Luanda mais limpa começa com você!
          </h1>
          <p className="text-center">
            Relate amontoados de lixo nas ruas e ajude a manter sua comunidade limpa. Empresas de reciclagem e recolha de lixo estão prontas para agir!
          </p>
          <div className="flex justify-center md:justify-center my-4">
            <PrimaryButton name="Comece a Relatar" addClassName="w-[22rem]" onClick={() => navigate('/Login')} />
          </div>
        </div>

        <div className="">
            {/* Mapa Interativo */}
              <Map />
        </div>
      </motion.div>

      {/* Seção Notícias */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center gap-6 p-6"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">Estado do saneamento em Luanda</h2>
          <p className="text-gray-600">
            Tenha as notícias sempre perto de si, sem precisar sair de casa.
          </p>
        </div>

        <section className="columns-2 md:columns-2 gap-4 space-y-4">
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
                <img className="w-full md:w-96 rounded-md" src={item.src} alt={item.title} />
              ) : (
                <video className="w-full md:w-96 rounded-md" src={item.src} autoPlay muted loop playsInline />
              )}
            </motion.div>
          ))}
        </section>

        <Link to="news" className="hover:underline transition delay-50 hover:text-green-800">Ver mais Notícias</Link>

        <div className="min-h-screen w-full bg-gray-50">
          <Card />
        </div>

        <div className="relative w-full h-[80vh] bg-cover bg-fixed bg-center" style={{ backgroundImage: `url(${imageFixed})` }}>
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
            <h2 className="text-white text-3xl font-semibold p-20">UM POR TODOS, E TODOS ACABANDO O LIXO!</h2>
          </div>
        </div>
      </motion.div>

      {/* FAQ Seção */}
      <motion.div
        className="p-6 md:px-16 flex flex-col md:flex-row justify-center items-center mt-14 mb-16 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-start w-full max-w-xl md:max-w-2xl">
          <p className="text-gray-600 font-semibold text-lg sm:text-xl">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Perguntas e Respostas Mais Frequentes</h2>
        </div>
        
        <div className="w-full max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <div
                className="py-4 text-lg sm:text-xl font-medium cursor-pointer hover:text-green-600"
                onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
              >
                {faq.question}
              </div>
              {selectedFAQ === index && (
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}


