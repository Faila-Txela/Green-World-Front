

function CardRelatos() {
  return (
    <div className="overflow-hidden bg-white py-20 px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-semibold text-lg md:text-2xl text-global-color-three mb-12">
          Alguns relatos já feitos por nossos usuários
        </h2>

        <div className="relative w-full overflow-hidden group">
          <div
            className="flex gap-12 animate-marquee group-hover:[animation-play-state:paused]"
             style={{ animationDuration: "20s" }}>
            {/* Cards Originais */}
            <div className="bg-white p-4 rounded-lg shadow-md w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://ecoangola.com/wp-content/uploads/2019/09/Lixo-em-luanda.jpg"
                  alt="lixo1"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Ajudou muito nossa empresa!
              </p>
              <h4 className="font-semibold text-lg text-gray-800">Sra. Ana</h4>
              <p className="text-gray-500 text-sm">Área de Marketing e Comunicação da ELISAL</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://s.rfi.fr/media/display/9409d8c0-6fad-11eb-a5e9-005056bff430/w:980/p:16x9/angola2.png"
                  alt="lixo2"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Meu bairro está mais limpo e saudável, graças à Green World.
              </p>
              <h4 className="font-semibold text-lg text-gray-800">João Francisco</h4>
              <p className="text-gray-500 text-sm">Usuário da Green World</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://static.dw.com/image/57507162_605.jpg"
                  alt="lixo3"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Minha comunidade já não tem mais amontoados de lixo, graças à Green World.
              </p>
              <h4 className="font-semibold text-lg text-gray-800">Mariana Oliveira</h4>
              <p className="text-gray-500 text-sm">Usuária da Green World</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-xl w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://static.dw.com/image/58614703_804.jpg"
                  alt="lixo4"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Plataforma excelente! A cidade de Luanda está mais limpa.
              </p>
              <h4 className="font-semibold text-lg text-gray-800">Maria da Graça</h4>
              <p className="text-gray-500 text-sm">Usuária da Green World</p>
            </div>

            {/* Cards Duplicados para criar o efeito contínuo */}
            <div className="bg-white p-4 rounded-lg shadow-md w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://ecoangola.com/wp-content/uploads/2019/09/Lixo-em-luanda.jpg"
                  alt="lixo1"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Ajudou muito nossa empresa!
              </p>
              <h4 className="font-semibold text-lg text-gray-800">Sra. Ana</h4>
              <p className="text-gray-500 text-sm">Área de Marketing e Comunicação da ELISAL</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://s.rfi.fr/media/display/9409d8c0-6fad-11eb-a5e9-005056bff430/w:980/p:16x9/angola2.png"
                  alt="lixo2"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Meu bairro está mais limpo e saudável, graças à Green World.
              </p>
              <h4 className="font-semibold text-lg text-gray-800">João Francisco</h4>
              <p className="text-gray-500 text-sm">Usuário da Green World</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://static.dw.com/image/57507162_605.jpg"
                  alt="lixo3"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Minha comunidade já não tem mais amontoados de lixo, graças à Green World.
              </p>
              <h4 className="font-semibold text-lg text-gray-800">Mariana Oliveira</h4>
              <p className="text-gray-500 text-sm">Usuária da Green World</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-xl w-72 shrink-0 text-center cursor-pointer">
              <div>
                <img
                  src="https://static.dw.com/image/58614703_804.jpg"
                  alt="lixo4"
                  className="w-full h-24 rounded mx-auto mb-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                Plataforma excelente! A cidade de Luanda está mais limpa.
              </p>
              <h4 className="font-semibold text-lg text-gray-800">Maria da Graça</h4>
              <p className="text-gray-500 text-sm">Usuária da Green World</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRelatos;
