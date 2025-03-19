import { motion } from "framer-motion";
import image1 from "../assets/pexels-lara-jameson-8828387.jpg";
import image2 from "../assets/pontos.webp";
import image3 from "../assets/beneficio.webp";

export default function CardCarousel() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <motion.section
        className="py-20 bg-gray-100 text-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-green-700 p-4">Benefícios de usar a Green World</h2>
        <p className="text-gray-600 mb-10 px-4">
          Descubra como você pode se beneficiar ao contribuir para um ambiente mais limpo.
        </p>

        {/* Container responsivo */}
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: image1,
                title: "Monetize com a Green World",
                desc: "Ganhe pontos a cada amontoado relatado, podendo trocar por prêmios.",
                alt: "Pessoa segurando dinheiro representando monetização",
              },
              {
                img: image2,
                title: "Benefícios Exclusivos",
                desc: "Acesso a eventos ecológicos e descontos em empresas parceiras.",
                alt: "Imagem representando benefícios exclusivos",
              },
              {
                img: image3,
                title: "Ajude Luanda a ficar mais limpa",
                desc: "Relate amontoados de lixo e veja as mudanças acontecerem!",
                alt: "Cidade limpa representando impacto positivo",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center max-w-xs mx-auto sm:max-w-full"
                whileHover={{ scale: 1.05 }}
              >
                <img className="h-40 w-full object-cover rounded-md" src={card.img} alt={card.alt} loading="lazy" />
                <h3 className="font-medium text-xl mt-4">{card.title}</h3>
                <p className="text-gray-600 mt-2">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

