import { useState, useEffect } from "react";
import Skeleton from "../components/ui/Skeleton";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";

function News() {
  const [news, setNews] = useState<{ title: string; description: string }[]>([]); // Estado para armazenar as notícias
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/news") 
      .then((response) => response.json())
      .then((data) => {
        setNews(data); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar notícias:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center py-8">
        <h1 className="text-lg md:text-3xl font-bold text-global-color-three mb-4 p-20">
          Últimas Notícias
        </h1>

        {isLoading ? (
          // Exibe 4 skeletons
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl p-6 animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 bg-green-600 p-4 rounded-lg shadow-lg">
                <div className="flex gap-6 items-center">
                  <Skeleton width="30%" height="20px" className="rounded-full" />
                </div>
                <Skeleton width="100%" height="120px" className="rounded-lg" />
                <Skeleton width="100%" height="80px" className="rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          // Renderiza as notícias reais em 2 colunas responsivas
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl">
            {news.length > 0 ? (
              news.map((item, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h2>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-6">Nenhuma notícia disponível no momento.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default News;

