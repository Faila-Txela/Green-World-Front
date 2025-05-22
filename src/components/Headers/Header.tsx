import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PrimaryButton from "../ui/PrimaryButton";
import Logo from "../../assets/Logo";
import { MdSunny, MdMood } from "react-icons/md";
import { CiGlobe, CiHome, CiBoxes, CiPhone, CiSquareInfo } from "react-icons/ci";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  const handleLoginClick = () => {
    navigate("/personal-login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const commonLinkStylesBlack =
    "text-black hover:global-color-primary text-[16px] font-medium hover:text-[#006943]";
  const commonLinkStylesWhite =
    "text-white hover:global-color-primary text-[16px] font-bold hover:text-[#006943]";

  return (
    <header className="flex bg-white fixed px-[5vw] w-full h-max justify-between items-center shadow-lg z-50">
      <div>
        <Logo className="w-16 h-16 md:h-24 md:w-32" />
      </div>

      {/* Botão de menu hambúrguer que vira X */}
<div className="md:hidden cursor-pointer z-30" onClick={toggleMobileMenu}>
  {isMobileMenuOpen ? (
    // Ícone de X (fechar)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-black transition-transform duration-300 hover:scale-110"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    // Novo ícone de hambúrguer minimalista
    <svg viewBox="0 0 100 80" width="30" height="30" className="text-black transition-transform duration-300 hover:scale-110">
      <rect width="100" height="10" rx="5" fill="currentColor"></rect>
      <rect y="30" width="100" height="10" rx="5" fill="currentColor"></rect>
      <rect y="60" width="100" height="10" rx="5" fill="currentColor"></rect>
    </svg>
  )}
</div>


      {/* Navegação Desktop */}
      <div className="hidden md:flex justify-between p-[8px] items-center gap-[210px]">
        <nav className="flex justify-center items-center gap-[28px]">
          <div className="flex items-center gap-2 hover:text-green-600 transition duration-200 cursor-pointer">
            <CiHome size={24} />
            <Link className={commonLinkStylesBlack} to="/">Início</Link>
          </div>

          <div className="flex items-center gap-2 hover:text-green-600 transition duration-200 cursor-pointer">
            <CiBoxes size={24} />
            <Link className={commonLinkStylesBlack} to="/enterprises">Empresas</Link>
          </div>

          <div className="flex items-center gap-2 hover:text-green-600 transition duration-200 cursor-pointer">
            <CiSquareInfo size={24} />
            <Link className={commonLinkStylesBlack} to="/blog">Blog</Link>
          </div>

          <div className="flex items-center gap-2 hover:text-green-600 transition duration-200 cursor-pointer">
            <CiGlobe size={24} />
            <Link className={commonLinkStylesBlack} to="/news">Notícias</Link>
          </div>

          <div className="flex items-center gap-2 hover:text-green-600 transition duration-200 cursor-pointer">
            <CiPhone size={24} />
            <Link className={commonLinkStylesBlack} to="/contacts">Contactos</Link>
          </div>

          <PrimaryButton
            onClick={handleLoginClick}
            name="Entrar"
            addClassName="w-full px-20"
          />

          {/* Tema/ dark || ligth
          <div className="">
            <CiSun size={32} className="cursor-pointer text-green-800" />
          </div> */}

        </nav>
      </div>

      {/* Menu Mobile */}
     {isMobileMenuOpen && (
  <>
    <div
      onClick={toggleMobileMenu}
      className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
    />
    <div className="fixed top-16 right-2 shadow-2xl rounded-xl p-5 backdrop-blur-md bg-black/60 border border-white/20 transition-all duration-500 md:hidden z-20">
      <nav className="flex flex-col justify-center items-center gap-6 p-3">

        <div className="flex items-center gap-3 group hover:text-green-500 transition duration-300 transform hover:scale-105 cursor-pointer">
          <CiHome size={26} className="text-white group-hover:text-green-500 transition duration-300" />
          <Link className={commonLinkStylesWhite} to="/">Início</Link>
        </div>

        <div className="flex items-center gap-3 group hover:text-green-500 transition duration-300 transform hover:scale-105 cursor-pointer">
          <CiBoxes size={26} className="text-white group-hover:text-green-500 transition duration-300" />
          <Link className={commonLinkStylesWhite} to="/enterprises">Empresas</Link>
        </div>

        <div className="flex items-center gap-3 group hover:text-green-500 transition duration-300 transform hover:scale-105 cursor-pointer">
          <CiSquareInfo size={26} className="text-white group-hover:text-green-500 transition duration-300" />
          <Link className={commonLinkStylesWhite} to="/blog">Blog</Link>
        </div>

        <div className="flex items-center gap-3 group hover:text-green-500 transition duration-300 transform hover:scale-105 cursor-pointer">
          <CiGlobe size={26} className="text-white group-hover:text-green-500 transition duration-300" />
          <Link className={commonLinkStylesWhite} to="/news">Notícias</Link>
        </div>

        <div className="flex items-center gap-3 group hover:text-green-500 transition duration-300 transform hover:scale-105 cursor-pointer">
          <CiPhone size={26} className="text-white group-hover:text-green-500 transition duration-300" />
          <Link className={commonLinkStylesWhite} to="/contacts">Contactos</Link>
        </div>

        <PrimaryButton
          onClick={handleLoginClick}
          name="Entrar"
          addClassName="w-full bg-global-color-secondary px-20 mt-2"
        />

      </nav>
    </div>

    {/* Botão de tema no menu móvel */}
    {/* <button 
      type="button"
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
      aria-label={darkMode ? "Modo claro" : "Modo escuro"}
    >
      {darkMode ? (
        <MdSunny size={24} className="text-yellow-400" />
      ) : (
        <MdDarkMode size={24} className="text-white" />
      )}
    </button> */}

  </>
   )}
    </header>
  );
}
