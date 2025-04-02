import { motion } from "framer-motion";

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

        {/* Container */}
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Monetize com a Green World",
                desc: "Ganhe pontos a cada amontoado relatado, podendo trocar por prêmios.",
              },
              {
                title: "Benefícios Exclusivos",
                desc: "Acesso a eventos ecológicos e descontos em empresas parceiras.",
              },
              {
                title: "Ajude Luanda a ficar mais limpa",
                desc: "Relate amontoados de lixo e veja as mudanças acontecerem!",
              },
              {
                title: "Mundo Saudável",
                desc: "Seja você também uma pessoa que procura pelo bem-estar do ambiente.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white h-36 shadow-lg rounded-lg p-4 text-center mx-3 sm:max-w-full hover:text-green-800"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-medium text-xl mt-4">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
