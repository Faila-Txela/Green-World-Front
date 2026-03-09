import { motion } from "framer-motion";
import { vantagens } from "../../../data/models";

export default function Vantagens() {

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <motion.section
        className="py-20 text-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="text-2xl md:text-4xl font-semibold p-2 mb-6 text-primary">Como funciona</div>
        <p className="text-gray-600 mb-10 px-4 max-w-3xl mx-auto">
          Siga estes passos para aproveitar todas as funcionalidades da Green World.
        </p>

        <div className="grid gap-8 grid-cols-1 max-w-7xl md:grid-cols-2 px-6 mx-auto">
          {vantagens.map((card, id) => {
            const Icon = card.icon; 
            
            return (
              <motion.div
                key={id}
                className="bg-white/30 shadow-lg border rounded-2xl p-6 flex flex-col items-start md:items-center text-justify md:text-center hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1 }}
              >
                <div className="w-14 h-14 text-2xl flex items-center justify-center rounded-full text-green-700 bg-green-100 mb-4">
                  <Icon />
                </div>
                <h3 className="font-semibold text-lg text-green-800">{card.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}