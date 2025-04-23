import { useNavigate } from 'react-router-dom';
import Header from '../components/Headers/Header';
import Footer from '../components/Footers/Footer';
import image from '../assets/coleta1.jpg';
import { FaLeaf, FaTrashAlt, FaUsers } from 'react-icons/fa';

function Blog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 mt-24">
        <section className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">🌱 Gestão de Resíduos em Luanda</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Descubra os desafios e soluções sustentáveis para o lixo urbano na capital angolana.
          </p>
        </section>

        <section className="flex flex-col-reverse md:flex-row items-center gap-10 mb-16">
          <div className="md:w-1/2 text-gray-800">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FaLeaf size={22} className='animate-pulse text-green-700' /> Introdução</h2>
            <p>
              Com o crescimento populacional, Luanda enfrenta grandes desafios na gestão de resíduos sólidos. Sensibilizar a população é essencial para construirmos uma cidade mais limpa e saudável.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={image}
              alt="Coleta de lixo"
              className="w-full h-auto rounded-xl shadow-lg blob-animation transition duration-500"
              style={{ clipPath: 'circle(80% at 50% 50%)' }}
            />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><FaTrashAlt size={22} className='animate-pulse text-green-700' /> Tipos de Resíduos</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Orgânicos (restos de comida, folhas)</li>
              <li>Recicláveis (papel, vidro, plástico, metal)</li>
              <li>Perigosos (pilhas, medicamentos, baterias)</li>
              <li>Industriais e hospitalares</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><FaUsers size={22} className='animate-pulse text-green-700' /> Importância da Separação</h2>
            <p className="text-gray-700">
              Separar corretamente o lixo é crucial para garantir a reciclagem e o tratamento adequado. A participação ativa da população é indispensável para o sucesso das iniciativas.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3">🚧 Desafios Atuais</h2>
            <p className="text-gray-700">
              Falta de infraestrutura, pouca educação ambiental e ineficiência na coleta contribuem para o acúmulo de lixo nas ruas, trazendo riscos à saúde.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-3">🌍 Soluções Sustentáveis</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Educação contínua nas escolas</li>
              <li>Cooperativas de reciclagem</li>
              <li>Investimento em infraestrutura</li>
              <li>Uso de tecnologia para monitoramento</li>
            </ul>
          </div>
        </section>

        <section className="bg-green-100 p-8 rounded-xl text-center shadow-inner">
          <h2 className="text-2xl font-bold text-green-800 mb-3">🌟 Participe da Mudança</h2>
          <p className="text-gray-700 mb-4">
            Junte-se a nós na missão de tornar Luanda mais limpa e sustentável. Sua atitude pode transformar nossa cidade!
          </p>
          <button
            onClick={() => navigate('/contacts')}
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Saiba mais
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;