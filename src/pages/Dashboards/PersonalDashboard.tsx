import { useState, useEffect } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import MapComponent from "../../components/Map";
import { FaTrashAlt, FaMapMarkerAlt, FaChartLine } from "react-icons/fa";
import { relatarService } from "../../modules/service/api/relatar/index";
import NotificacaoCard from "components/notificacao/notificacao_card";

export default function PersonalDashboard() {

  const [relatosAll, setRelatosAll] = useState([]);
  const [ultimoLocal, setUltimoLocal] = useState("");
  const notificações = 10;

  useEffect(() => {
    relatarService.getAll().then((response) => {
      const relatos = response.data;
      setRelatosAll(relatos);

      if (relatos.length > 0) {
        // Ordena por data (mais recente primeiro)
        const maisRecente = relatos
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )[0];

        setUltimoLocal(maisRecente?.bairro || "Bairro não informado");
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center mt-40">
      {/* Título */}
      <div className="flex items-center p-4 gap-3 absolute top-20 left-72">
        <MdOutlineSpaceDashboard className="h-9 w-9 text-green-600 animate-pulse" />
        <h1 className="text-xl md:text-2xl font-semibold text-left">
          Painel Principal do Cidadão
        </h1>
      </div>

      <div className="w-full">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <FaTrashAlt className="text-4xl text-green-600 mb-2" />
            <h3 className="text-lg font-semibold">Total de Relatos</h3>
            <p className="text-2xl text-primary font-bold">
              {relatosAll.length}
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <FaMapMarkerAlt className="text-4xl text-green-600 mb-2" />
            <h3 className="text-lg font-semibold">Último Local Registrado</h3>
            <p className="text-xl text-gray-700">{ultimoLocal}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
            <FaChartLine className="text-4xl text-green-600 mb-2" />
            <h3 className="text-lg font-semibold">Notificações</h3>
            <p className="text-2xl text-primary font-bold">{notificações}</p>
          </div>
        </div>

        {/* Mapa */}
        <div className="bg-white p-4 shadow rounded-xl hover:shadow-lg transition-all duration-300 w-full mb-10">
          <h2 className="text-lg font-semibold mb-4 text-start">
            Mapa de Locais com Relatos
          </h2>
          <MapComponent />
        </div>
      </div>

    </div>
  );
}