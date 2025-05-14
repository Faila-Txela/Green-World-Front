import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";

export default function ErrorPage() {

  return (
  <div>
      <Header />
    <div className="flex-col h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3 p-2">
        <h2 className="font-bold text-[12rem] text-center text-[#068a5b]">
           404
        </h2>
        <p className="text-center text-base">
          A página que está tentando acessar não existe.
        </p>
        <Link to="/" className="text-[#068a5b] hover:underline transition duration-500">Volte á pagina inicial</Link>
      </div>
    </div>
        <Footer />
  </div>
  );
}
