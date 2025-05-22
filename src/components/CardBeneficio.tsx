import { motion } from "framer-motion";
import { FaUserAlt, FaBuilding, FaRecycle, FaGlobeAmericas } from "react-icons/fa";

const passos = [
  {
    icon: <FaUserAlt size={28} className="text-green-700" />,
    title: "Cadastre-se como Cidadão",
    desc: "Faça seu cadastro para começar a relatar amontoados de lixo em sua região.",
  },
  {
    icon: <FaBuilding size={28} className="text-green-700" />,
    title: "Cadastre-se como Empresa",
    desc: "Empresas podem monitorar e atuar em locais críticos, além de agendar ações ecológicas.",
  },
  {
    icon: <FaRecycle size={28} className="text-green-700" />,
    title: "Relate Amontoados",
    desc: "Envie relatos com fotos e localização para ajudar na limpeza da cidade.",
  },
  {
    icon: <FaGlobeAmericas size={28} className="text-green-700" />,
    title: "Impacte o Mundo",
    desc: "Contribua para um ambiente mais limpo, saudável e sustentável.",
  },
];

export default function CardBeneficios() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <motion.section
        className="py-20 text-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2 className="text-lg md:text-3xl font-bold text-green-700 mb-2">Guia de uso da Green World</h2>
        <p className="text-gray-600 mb-10 px-4 max-w-3xl mx-auto">
          Siga estes passos para aproveitar ao máximo todas as funcionalidades da Green World.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 max-w-7xl mx-auto">
          {passos.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
                {card.icon}
              </div>
              <h3 className="font-semibold text-lg text-green-800">{card.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
