import { useState } from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import Logo from "../../assets/Logo";
import Skeleton from "../ui/Skeleton";
import FooterLinks from "../../components/FooterLinks";

export default function Footer() {

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => setIsLoading(false), 2000)

  const groupLinks1 = {
    title: "Mapa do site",
    links: [
      { label: "Inicio", link: "" },
      { label: "Notícias", link: "news" },
      { label: "Blog", link: "blog" },
      { label: "Empresas", link: "enterprises" },
      { label: "Contactos", link: "contacts" },
    ],
  };

  const groupLinks2 = {
    title: "Links úteis",
    links: [
      { label: "Sites Greens", link: "https://www.elisal.ao/" },
      { label: "Contacte-nos", link: "contacts" },
    ],
  };

  return (
    <div className="flex flex-col items-center p-10 text-white bg-black/75">
      <div className="flex items-center gap-[50px]">
        <div className="flex justify-center items-center flex-col gap-[8px] transition-class">
          <div className="flex justify-center items-center w-32 h-[48px] p-2 rounded-[2px]">
            <Logo className="w-[90px] h-[90px]" />
          </div>

          <span className="text-center">Siga-nos nas redes sociais</span>
          <div className="flex gap-4 mx-auto">
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/albertinafaila/" title="Instagram">
              <IoLogoInstagram size={40} color="white" />
            </a>

            <a href="#" title="LinkedIn">
              <CiLinkedin size={40} color="white" />
            </a>
          </div>
        </div>
        <FooterLinks data={[groupLinks1, groupLinks2]} />
      </div>

      {isLoading ? (
        <Skeleton width="100%" height="20px" />
      ) : (
        <div className="flex justify-center w-full border-t border-white/30 mt-6 pt-4 gap-2">
          <Link to="/Terms" className="text-green-600 hover:underline transition duration-500">Termos e política de privacidade da Green World</Link>
          <p>|</p>
          <p>Green World © 2025 - Direitos reservados</p>
        </div>
      )}
    </div>
  );
}
