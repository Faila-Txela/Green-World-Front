function CardRelatos() {
  const cards = [
    {
      img: "https://ecoangola.com/wp-content/uploads/2019/09/Lixo-em-luanda.jpg",
      alt: "lixo1",
      feedback: "Ajudou muito nossa empresa!",
      name: "Sra. Ana",
      role: "Área de Marketing e Comunicação da ELISAL",
    },
    {
      img: "https://s.rfi.fr/media/display/9409d8c0-6fad-11eb-a5e9-005056bff430/w:980/p:16x9/angola2.png",
      alt: "lixo2",
      feedback: "Meu bairro está mais limpo e saudável, graças à Green World.",
      name: "João Francisco",
      role: "Usuário da Green World",
    },
    {
      img: "https://static.dw.com/image/57507162_605.jpg",
      alt: "lixo3",
      feedback: "Minha comunidade já não tem mais amontoados de lixo, graças à Green World.",
      name: "Mariana Oliveira",
      role: "Usuária da Green World",
    },
    {
      img: "https://static.dw.com/image/58614703_804.jpg",
      alt: "lixo4",
      feedback: "Plataforma excelente! A cidade de Luanda está mais limpa.",
      name: "Maria da Graça",
      role: "Usuária da Green World",
    },
  ];

  const renderCard = (card: { img: string; alt: string; feedback: string; name: string; role: string }, index: number, isShadow = false) => (
    <div
      key={`${card.name}-${index}-${isShadow ? "shadow-xl" : "shadow-md"}`}
      className={`bg-white p-4 rounded-lg ${isShadow ? "shadow-xl" : "shadow-md"} w-72 shrink-0 text-center cursor-pointer`}
    >
      <div>
        <img
          src={card.img}
          alt={card.alt}
          className="w-full h-24 rounded mx-auto mb-4 object-cover"
        />
      </div>
      <p className="text-gray-600 mb-2 text-sm">{card.feedback}</p>
      <h4 className="font-semibold text-lg text-gray-800">{card.name}</h4>
      <p className="text-gray-500 text-sm">{card.role}</p>
    </div>
  );

  return (
    <div className="overflow-hidden bg-white py-32 px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-semibold text-lg md:text-2xl text-global-color-three mb-10">
          Alguns relatos já feitos por nossos usuários
        </h2>

        <div className="relative w-full overflow-hidden group">
          <div
            className="flex gap-12 animate-marquee group-hover:[animation-play-state:paused] p-8"
          >
            {/* Cards Originais */}
            {cards.map((card, index) =>
              renderCard(card, index, index === 0)
            )}

            {/* Cards Duplicados para criar o efeito contínuo */}
            {cards.map((card, index) =>
              renderCard(card, index + cards.length, index === 0)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRelatos;
