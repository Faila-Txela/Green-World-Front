import { cardRelatos } from "../data/models";

function RelatosResolvidos() {

  const renderCard = (card: { img: string; alt: string; feedback: string; name: string; role: string }, index: number, isShadow = false) => (
    <div
      key={`${card.name}-${index}-${isShadow ? "shadow-xl" : "shadow-md"}`}
      className={`bg-white p-4 rounded-lg ${isShadow ? "shadow-xl" : "shadow-md"} w-72 shrink-0 text-center cursor-pointer`}
    >
      <img
        src={card.img}
        alt={card.alt}
        className="w-full h-24 rounded mx-auto mb-4 object-cover"
      />
      <p className="text-gray-600 mb-2 text-sm">{card.feedback}</p>
      <h4 className="font-semibold text-lg text-gray-800">{card.name}</h4>
      <p className="text-gray-500 text-sm">{card.role}</p>
    </div>
  );

  return (
    <div className="overflow-hidden py-32 px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-6">
          Amontoados já resolvidos com sucesso
        </h2>

        <div className="relative w-full overflow-hidden group">
          <div className="flex gap-12 animate-marquee group-hover:[animation-play-state:paused] p-8">
            {/* Cards Originais */}
            {cardRelatos.map((card, index) => renderCard(card, index, index === 0))}

            {/* Duplicação para efeito contínuo */}
            {cardRelatos.map((card, index) => renderCard(card, index + cardRelatos.length, index === 0))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatosResolvidos;
