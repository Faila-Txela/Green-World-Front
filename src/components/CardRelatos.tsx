function CardRelatosResolvidos() {
  const cards = [
    {
      img: "https://noticiasdeangola.co.ao/wp-content/uploads/2023/05/limpeza-lixo-angola.jpg",
      alt: "amontoado1",
      feedback: "A remoção desse amontoado trouxe mais dignidade e segurança para todos nós.",
      name: "Carlos Mavungo",
      role: "Morador do Bairro Palanca",
    },
    {
      img: "https://s.alicdn.com/@sc04/kf/Hc790f72c1a9e494a8307bec2fe6f0a565.jpg_720x720q50.jpg",
      alt: "amontoado2",
      feedback: "Antes era um ponto de lixo, agora virou uma praça com espaço para as crianças brincarem.",
      name: "Helena Samuel",
      role: "Líder comunitária do Cazenga",
    },
    {
      img: "https://img.rtp.pt/icm/noticias/images/destaques/1237229.jpg",
      alt: "amontoado3",
      feedback: "O mau cheiro e os insetos sumiram depois que a limpeza foi feita. Excelente trabalho!",
      name: "Tomás Lemos",
      role: "Empresário local",
    },
    {
      img: "./mine.png",
      alt: "amontoado4",
      feedback: "Agora temos orgulho da nossa rua, tudo limpo e bonito.",
      name: "Luciana Pedro",
      role: "Usuária da plataforma Green World",
    },
  ];

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
    <div className="overflow-hidden bg-gray-100 py-32 px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-semibold text-lg md:text-2xl text-green-700 mb-10">
          Amontoados já resolvidos com sucesso
        </h2>

        <div className="relative w-full overflow-hidden group">
          <div className="flex gap-12 animate-marquee group-hover:[animation-play-state:paused] p-8">
            {/* Cards Originais */}
            {cards.map((card, index) => renderCard(card, index, index === 0))}

            {/* Duplicação para efeito contínuo */}
            {cards.map((card, index) => renderCard(card, index + cards.length, index === 0))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRelatosResolvidos;
