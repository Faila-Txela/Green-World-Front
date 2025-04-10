import { useNavigate } from 'react-router-dom';
import Header from '../../components/Headers/Header';
import Footer from '../../components/Footers/Footer';
import PrimaryButton from '../../components/ui/PrimaryButton';
import image from '../../assets/Law firm-bro.png';

export default function Enterprises() {

  const navigate = useNavigate();

  return(
    <div className="bg-gray-50">
      <Header />
      
      {/* Conteúdo principal, com margem superior para dar espaço após o header */}
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center py-20 px-8 md:px-16 space-y-12 md:space-y-20 md:space-x-16">
        
        {/* Texto da seção */}
        <div className="max-w-xl text-center md:text-left mt-20">
          <h1 className="font-semibold text-4xl text-gray-800 mb-6">
            Transforme o Futuro com Green World
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A Green World é uma plataforma de geolocalização dedicada a identificar e mapear amontoados de lixo em diversas áreas urbanas. Estamos criando um impacto positivo no mundo ao conectar empresas, governos e cidadãos para construir cidades mais limpas e sustentáveis. Ao se unir a nós, sua empresa terá um papel vital na preservação do meio ambiente.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Ao registrar sua empresa na nossa plataforma, você terá acesso a ferramentas inovadoras para monitorar, reportar e ajudar na limpeza de pontos críticos de lixo. Contribua para um mundo mais verde e inteligente com um simples clique.
          </p>
            <PrimaryButton name='Registre sua empresa' addClassName='' onClick={() => navigate("/register-enterprise")} />
        </div>
        
        {/* Imagem */}
        <div className="flex justify-center w-full max-w-md">
          <img className="w-full h-[30rem] md:h-auto rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500" src={image} alt="Imagem ilustrativa de geolocalização de lixo" />
        </div>
        
      </div>

      {/* Seção de impacto ambiental */}
      <div className="bg-white py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-semibold text-3xl text-gray-800 mb-6">
            O Impacto da Green World
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Nossa plataforma não apenas ajuda a identificar e mapear os pontos críticos de lixo, mas também promove ações colaborativas entre empresas, ONGs e o setor público para promover a limpeza das áreas afetadas. Ao utilizar o sistema de geolocalização da Green World, sua empresa estará contribuindo diretamente para um planeta mais limpo e sustentável.
          </p>
          <p className="text-lg text-gray-600">
            Com o aumento da conscientização ambiental e a urgência em resolver os problemas urbanos, a Green World coloca sua empresa como uma parceira chave na transformação das cidades em locais mais saudáveis e menos poluídos.
          </p>
        </div>
      </div>

      {/* Seção de Vantagens */}
      <div className="bg-gray-50 py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-semibold text-3xl text-gray-800 mb-6">
            Vantagens de Registrar sua Empresa Conosco
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Ao registrar sua empresa na Green World, você se junta a um movimento global de transformação sustentável. Além de atuar em ações concretas de preservação, você ganha benefícios exclusivos para sua organização:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md duration-300 transform hover:scale-105">
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Acesso à Tecnologia de Geolocalização</h3>
              <p className="text-gray-600">
                Utilize nossa plataforma inovadora para identificar pontos críticos de lixo e desenvolver ações rápidas e eficazes para solucioná-los.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md duration-300 transform hover:scale-105">
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Contribuição Ambiental Visível</h3>
              <p className="text-gray-600">
                Seja uma empresa responsável e ganhe visibilidade por suas ações ambientais, participando ativamente na limpeza e sustentabilidade urbana.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md duration-300 transform hover:scale-105">
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Impacto Positivo para sua Marca</h3>
              <p className="text-gray-600">
                Associe sua marca a causas ambientais de grande impacto e fortaleça sua reputação no mercado com uma postura proativa em relação à preservação.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md duration-300 transform hover:scale-105">
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Parcerias Estratégicas</h3>
              <p className="text-gray-600">
                Colabore com outras empresas e ONGs para a implementação de projetos ambientais de grande alcance, promovendo mudanças significativas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testemunhos */}
      <div className="bg-white py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-semibold text-3xl text-gray-800 mb-6">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-full md:w-1/3">
              <p className="text-lg text-gray-600 mb-4">
                "A Green World tem sido fundamental para a implementação de nossas estratégias ambientais. Contribuir para um mundo mais limpo e inteligente é uma das principais razões pelas quais registramos nossa empresa aqui."
              </p>
              <h4 className="font-semibold text-xl text-gray-800">Carlos Silva</h4>
              <p className="text-gray-500">CEO da SilvaTech</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-full md:w-1/3">
              <p className="text-lg text-gray-600 mb-4">
                "Com a Green World, conseguimos mapear áreas de lixo em nossa cidade e colaborar com outras empresas para promover um ambiente mais saudável para todos. A plataforma é uma excelente ferramenta para empresas que querem fazer a diferença."
              </p>
              <h4 className="font-semibold text-xl text-gray-800">Mariana Oliveira</h4>
              <p className="text-gray-500">Co-fundadora da InnovateX</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}