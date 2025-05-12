import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PrimaryButton from "../ui/PrimaryButton";
import Logo from "../../assets/Logo";
import { MdSunny, MdMood } from "react-icons/md";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Verifica o tema ao carregar o componente
  // useEffect(() => {
  //   if (localStorage.theme === 'dark' || 
  //       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //     setDarkMode(true);
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     setDarkMode(false);
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, []);

  // Alterna entre dark e light mode
  // const toggleDarkMode = () => {
  //   if (darkMode) {
  //     document.documentElement.classList.remove('dark');
  //     localStorage.theme = 'light';
  //   } else {
  //     document.documentElement.classList.add('dark');
  //     localStorage.theme = 'dark';
  //   }
  //   setDarkMode(!darkMode);
  // };

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
        <Logo className="w-16  h-16 md:h-24 md:w-32" />
      </div>

      {/* Botão de alternância do menu móvel */}
      <div
        className="flex flex-col md:hidden gap-1 cursor-pointer"
        onClick={toggleMobileMenu}
      >
        <span className="w-[25px] h-[3px] bg-black"></span>
        <span className="w-[25px] h-[3px] bg-black"></span>
        <span className="w-[25px] h-[3px] bg-black"></span>
      </div>

      {/* Navegação para desktop */}
      <div className="hidden md:flex justify-between p-[8px]  items-center gap-[210px]">
        <nav className="flex justify-center items-center gap-[28px]">
          <Link className={commonLinkStylesBlack} to="/">
            Início
          </Link>
          <Link className={commonLinkStylesBlack} to="/news">
            Notícias
          </Link>
          <Link className={commonLinkStylesBlack} to="/blog">
            Blog
          </Link>
          <Link className={commonLinkStylesBlack} to="/enterprises">
            Empresas
          </Link>
          <Link className={commonLinkStylesBlack} to="/contacts">
            Contactos
          </Link>

          <PrimaryButton
            onClick={handleLoginClick}
            name="Entrar"
            addClassName="w-full px-20"
          />

          {/* Tema/ dark || ligth */}
          <div className="">
            <MdSunny size={32} className="cursor-pointer text-green-800" />
          </div>
    
        </nav>
      </div>

      {/* Menu móvel */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay para bloquear a interação com o fundo */}
          <div
            onClick={toggleMobileMenu}
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          />
          <div className="fixed top-8 h-screen right-0 justify-between p-3 bg-black/70 md:hidden z-20">
            <nav className="flex flex-col justify-center items-center gap-[28px] p-3">
              <Link className={commonLinkStylesWhite} to="/">
                Início
              </Link>
              <Link className={commonLinkStylesWhite} to="/news">
                Notícias
              </Link>
              <Link className={commonLinkStylesWhite} to="/blog">
             Blog
            </Link>
              <Link className={commonLinkStylesWhite} to="/enterprises">
                Empresas
              </Link>
              <Link className={commonLinkStylesWhite} to="/contacts">
                Contactos
              </Link>

              <PrimaryButton
                onClick={handleLoginClick}
                name="Entrar"
                addClassName="w-full bg-global-color-secondary px-20"
              />

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

            </nav>
          </div>
        </>
      )}
    </header>
  );
}
