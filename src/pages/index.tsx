import { useState, useEffect } from "react";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useNavigate, Link } from "react-router-dom";
import video from '../assets/video/coletaSelectiva.mp4';
import map from '../assets/map1.png';
import image2 from '../assets/coleta.jpg';
import video2 from '../assets/video/catadores.mp4';
import image4 from '../assets/carta.jpg';
import imageFixed from '../assets/pexels-tomfisk-3174349.jpg';
import mine from '../assets/mine.png'
import CardBeneficios from "../components/CardBeneficio";
import CardRelatos from "../components/CardRelatos";
import { motion } from "framer-motion"; 

 //https://www.google.com/search?sca_esv=8568c3189e4a4419&sxsrf=AHTn8zpPPsJib0eVvJPPadQG3atKLKjSMw:1743267080151&q=api%27s+gratuitas+para+usar+mapas+em+projetos+react+js&spell=1&sa=X&ved=2ahUKEwipqb7436-MAxUhVEEAHUkKMc0QBSgAegQIDRAB&biw=1536&bih=738&dpr=1.25

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
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-600">✖</button>
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
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolling(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const midiaItens = [
    { type: "image", src: image2, title: "Coleta Seletiva", description: "A importância da separação correta dos resíduos.", time: "2h atrás" },
    { type: "video", src: video, title: "Processo de Reciclagem", description: "Como funciona a coleta seletiva em Luanda.", time: "4h atrás" },
    { type: "image", src: image4, title: "Carta aos Catadores", description: "O papel dos catadores na limpeza urbana.", time: "1 dia atrás" },
    { type: "video", src: video2, title: "História dos Catadores", description: "A luta diária dos catadores de lixo.", time: "3 dias atrás" },
  ];

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

  return (
    <div className="min-h-screen flex flex-col">
      
<Header />

{/* Seçcão principal */}      
<motion.div 
  className="min-h-screen flex md:flex-row flex-col items-center justify-center"
  initial={{ opacity: 0, y: 50 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }}
>
  <div 
    className="relative w-full h-[100vh] bg-cover bg-fixed bg-center" 
    style={{ backgroundImage: `url(${mine})` }}>
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 text-center px-4">
      <div>
        <h1 className="text-white text-4xl font-semibold text-start">Luanda mais limpa começa com você!</h1>
        <p className="text-lg text-gray-300 mt-4">Relate amontoados de lixo nas ruas e ajude a manter sua comunidade limpa. Empresas de reciclagem e recolha de lixo estão prontas para agir!</p>
      </div>
    </div>

    <div className="absolute top-80 md:top-44 inset-0 flex justify-center items-center">
      <PrimaryButton 
        onClick={() => navigate("/register-personal")} 
        name="Comece a Relatar" 
        addClassName="px-16 py-3 text-lg" 
      />
    </div>
  </div>
</motion.div>

{/* Seçcão sobre */}
<motion.div 
  className="min-h-screen flex md:flex-row flex-col items-center justify-around"
  initial={{ opacity: 0, y: 50 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }}>
  <div className="w-full">
      <img src={map} className="w-full md:w-9/12 h-80 md:h-2/3 py-20" alt="MapImage" />
    </div>

    <div className="w-full md:w-1/2 text-gray-600 text-center md:text-left mx-3 px-6 md:px-2">
      <h2 className="text-lg md:text-2xl font-bold text-global-color-three text-center mb-4 md:mb-16">O que é a Green World ?</h2>
      <p className="text-sm md:text-base text-justify mt-7">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit amet laudantium possimus est. Quidem, veniam blanditiis esse animi sequi eligendi atque hic optio.</p>
      <p className="text-sm md:text-base text-justify mt-7">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit amet laudantium possimus est. Quidem, veniam blanditiis esse animi sequi eligendi atque hic optio.</p>
      <p className="text-sm md:text-base text-justify mt-7">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit amet laudantium possimus est. Quidem, veniam blanditiis esse animi sequi eligendi atque hic optio.</p>
    </div>
</motion.div>

{/* Seçcão Benefícios */}
  <div>
    <CardBeneficios />
  </div>


{/* Sessão Notícias */}
<motion.div
        className="min-h-screen flex flex-col items-center justify-center gap-6 p-6"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="text-center">
          <h2 className="text-lg md:text-2xl font-bold text-global-color-three">Estado do saneamento em Luanda</h2>
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
<Link to="news" className="hover:underline transition delay-50 hover:text-green-800">Ver mais Notícias</Link>
</motion.div>

      
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />} 
      
{/* Seção cardRelatos */}
      <div className="mt-10">
        <CardRelatos />
      </div>


{/* Seçcão fixedImage */}
      <div className="relative w-full h-[80vh] bg-cover bg-fixed bg-center" style={{ backgroundImage: `url("https://images.pexels.com/photos/3174349/pexels-photo-3174349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")` }}>
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40">
            <h2 className="text-white text-lg md:text-2xl font-semibold p-20">UM POR TODOS, E TODOS ACABANDO O LIXO!</h2>
          </div>
      </div>


{/* Seção FAQ */}
<motion.div
  className="p-6 md:px-16 flex flex-col md:flex-row justify-center items-center mt-14 mb-16 gap-8"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}>

  <div className="text-start w-full max-w-xl md:max-w-2xl">
    <p className="text-gray-600 font-semibold text-lg sm:text-xl">FAQ</p>
    <h2 className="text-3xl sm:text-4xl font-semibold text-global-color-three mb-6">Perguntas e Respostas Mais Frequentes</h2>
  </div>
  
  <div className="w-full max-w-2xl space-y-4">
    {faqs.map((faq, index) => (
      <div key={index} className="border-b border-gray-300">
        <div
          className="py-4 text-lg sm:text-xl font-medium cursor-pointer hover:text-green-600"
          onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
        >
          <span className="font-bold">{index + 1}.</span> {faq.question}
        </div>
        {selectedFAQ === index && (
          <p className="text-gray-600 mt-2 text-sm sm:text-base">{faq.answer}</p>
        )}
      </div>
    ))}
  </div>
</motion.div>

{/* Seçcão rodapé */}
      <Footer />
    </div>
  );
}
