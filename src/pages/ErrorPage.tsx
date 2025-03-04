import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";

export default function ErrorPage() {

  return (
    <div>

        <Header />

        <div className="flex-col h-screen flex justify-center items-center">

      <div className="flex flex-col justify-center items-center gap-3 p-2">
        <h2 className="font-bold text-[12rem] text-center text-[#4d953e]">
           404
        </h2>
        <p className="text-center text-base">
          A página que está tentando acessar não existe.
        </p>

        <a href="#" className="text-[#4d953e] hover:underline transition duration-500">Volte á página inicial.</a>
      </div>

    </div>
    
        <Footer />
    </div>
  );
}
