import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { MdSunny } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import Logo from "../../assets/Logo";
import Skeleton from "../ui/Skeleton";
import FooterLinks from "../../components/FooterLinks";

export default function Footer() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {

    setTimeout(() => setIsLoading(false), 3000);

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const groupLinks1 = {
    title: "Mapa do site",
    links: [
      { linkName: "Inicio", link: "/" },
      { linkName: "Notícias", link: "/news" },
      { linkName: "Empresas", link: "/empresas" },
      { linkName: "Contactos", link: "/contactos" },
    ],
  };

  const groupLinks2 = {
    title: "Links úteis",
    links: [
      { linkName: "Sites Greens", link: "https://www.elisal.ao/" },
      { linkName: "Contacte-nos", link: "/" },
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

      {/* Botão de alternância de tema com ícones
      <button
        onClick={toggleTheme}
        className="mt-6 px-4 py-2 flex items-center gap-2 border rounded text-white bg-gray-700 hover:bg-gray-600 transition"
      >
        {darkMode ? <MdSunny size={20} /> : <RiMoonFill size={20} />}
        {darkMode ? "Modo Claro" : "Modo Escuro"}
      </button> */}

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
