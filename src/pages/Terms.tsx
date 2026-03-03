import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Terms() {
  const sectionTitle = "font-semibold text-2xl text-green-800";
  const paragraph = "text-gray-700";
  const highlight = "font-semibold text-green-600";

  return (
    <div className="bg-gray-50">
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <section className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-24">
          <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
            Termos de Uso e Política de Privacidade
          </h1>

          <ul className="space-y-6">
            <li>
              <h2 className={sectionTitle}>1. Definições</h2>
              <ul className="list-inside list-disc text-gray-700 ml-6">
                <li><span className="font-semibold">Plataforma:</span> refere-se ao software Green World.</li>
                <li><span className="font-semibold">Usuário:</span> qualquer pessoa que acessa a plataforma.</li>
                <li><span className="font-semibold">Conta:</span> cadastro dos usuários na plataforma.</li>
                <li><span className="font-semibold">Serviço:</span> refere-se às funcionalidades oferecidas pela plataforma.</li>
              </ul>
            </li>

            <li>
              <h2 className={sectionTitle}>2. Aceitação dos Termos</h2>
              <p className={paragraph}>
                Ao acessar e utilizar a plataforma Green World, o Usuário concorda com os termos e condições aqui estabelecidos. 
                Caso o Usuário não concorde com algum dos termos, deverá interromper o uso da plataforma imediatamente.
              </p>
            </li>

            <li>
              <h2 className={sectionTitle}>3. Modificação dos Termos</h2>
              <p className={paragraph}>
                A Green World se reserva o direito de modificar, a qualquer momento, os termos e condições de uso da plataforma. 
                Quaisquer alterações serão notificadas aos Usuários, e a continuidade do uso da plataforma após essas modificações implica na aceitação das novas condições.
              </p>
            </li>

            <li>
              <h2 className={sectionTitle}>4. Privacidade</h2>
              <p className={paragraph}>
                A Green World respeita a privacidade de seus Usuários e está comprometida em proteger seus dados pessoais. 
                Consulte nossa <span className={highlight}>Política de Privacidade</span> para entender como coletamos, usamos e protegemos suas informações.
              </p>
            </li>

            <li>
              <h2 className={sectionTitle}>5. Responsabilidades do Usuário</h2>
              <p className={paragraph}>
                O Usuário é responsável por manter a confidencialidade de suas credenciais de acesso à plataforma e por todas as atividades realizadas em sua conta. 
                O Usuário concorda em não utilizar a plataforma para fins ilegais ou proibidos.
              </p>
            </li>

            <li>
              <h2 className={sectionTitle}>6. Limitação de Responsabilidade</h2>
              <p className={paragraph}>
                A Green World não se responsabiliza por danos indiretos, consequenciais ou perdas resultantes do uso da plataforma, 
                exceto nas situações em que for exigido por lei.
              </p>
            </li>

            <li>
              <h2 className={sectionTitle}>7. Política de Privacidade</h2>
              <p className={paragraph}>
                A Green World coleta e utiliza dados pessoais do Usuário conforme descrito em nossa <span className={highlight}>Política de Privacidade</span>. 
                Os dados são usados para melhorar a experiência do Usuário e oferecer serviços personalizados.
              </p>
            </li>

            <li>
              <h2 className={sectionTitle}>8. Alterações na Política de Privacidade</h2>
              <p className={paragraph}>
                A Política de Privacidade pode ser atualizada periodicamente para refletir mudanças nas práticas de privacidade ou nas regulamentações aplicáveis. 
                O Usuário será informado sobre essas alterações, e a continuação do uso da plataforma implica aceitação da versão atualizada.
              </p>
            </li>

            <li>
              <h2 className={sectionTitle}>9. Contato</h2>
              <p className={paragraph}>
                Caso o Usuário tenha dúvidas sobre os Termos de Uso ou a Política de Privacidade, pode entrar em contato com a Green World através do e-mail: 
                <span className={highlight}> greenworld70@gmail.com</span>.
              </p>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Terms;
