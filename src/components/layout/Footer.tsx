import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import FooterLinks from "../../components/FooterLinks";
import { CiInstagram, CiLinkedin, CiFacebook } from "react-icons/ci";

export default function Footer() {

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => setIsLoading(false), 2000)

  const groupLinks1 = {
    title: "Mapa do site",
    links: [
      { label: "Inicio", link: "/" },
      { label: "Notícias", link: "/news" },
      { label: "Empresas", link: "/enterprises" },
      { label: "Contactos", link: "/contacts" },
    ],
  };

  // const groupLinks2 = {
  //   title: "Links úteis",
  //   links: [
  //     { label: "Sites Greens", link: "https://www.elisal.ao/" },
  //     { label: "Contacte-nos", link: "/contacts" },
  //   ],
  // };

  return (
    <div className="flex flex-col items-center p-10 text-white bg-black/75">
      <div className="flex items-center gap-[50px]">
        <div className="flex justify-center items-center flex-col gap-[8px] transition-class">
          <div className="flex justify-center items-center w-32 h-[48px] p-2 rounded-[2px]">
            <Logo className="w-[90px] h-[90px]" />
          </div>

          <span className="text-center">Siga-nos nas redes sociais</span>
          <div className="flex gap-4 mx-auto">
            <a href="https://www.instagram.com/albertinafaila/" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:scale-105 transition-all duration-200 inline-block">
              <CiInstagram size={40} color="white" />
            </a>

            <a href="#" rel="noopener noreferrer" target="_blank" title="Facebook" className="hover:scale-105 transition-all duration-200 inline-block">
              <CiFacebook size={40} color="white" />
            </a>

            <a href="https://www.linkedin.com/in/txela-sauimbo-a6357730b/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:scale-105 transition-all duration-200 inline-block">
              <CiLinkedin size={40} color="white" />
            </a>
          </div>
        </div>
        <FooterLinks data={[groupLinks1]} />
      </div>

        <div className="flex justify-center w-full border-t border-white/30 mt-6 pt-4 gap-2">
          <Link to="/terms" className="text-green-600 hover:underline transition duration-500">Termos e política de privacidade</Link>
          <p>|</p>
          <p>Green World © 2026 - Direitos reservados</p>
        </div>
    </div>
  );
}
