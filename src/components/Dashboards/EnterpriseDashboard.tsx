import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { PiCity } from "react-icons/pi";
import { MdOutlineCalendarMonth, MdOutlineMergeType, MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRecycle } from "react-icons/fa";


export default function EnterpriseDashboard() {
  
  const locationsData = [
    { name: "Rangel", relatos: 65 },
    { name: "Mutamba", relatos: 86 },
    { name: "Viana", relatos: 120 },
  ];

  const monthsData = [
    { name: "Fevereiro", coletados: 70 },
    { name: "Março", coletados: 50 },
    { name: "Abril", coletados: 10 },
  ];

  const wasteTypesData = [
    { name: "Plástico", value: 26 },
    { name: "Orgânico", value: 38 },
    { name: "Metal", value: 10 },
  ];

  const fluxoRecolhaData = [
    { etapa: "Semana 1", Agendado: 20, EmAndamento: 10, Concluído: 5 },
    { etapa: "Semana 2", Agendado: 15, EmAndamento: 18, Concluído: 12 },
    { etapa: "Semana 3", Agendado: 10, EmAndamento: 20, Concluído: 25 },
    { etapa: "Semana 4", Agendado: 5, EmAndamento: 10, Concluído: 30 },
  ];

  const COLORS = ["#FF0000", "#964B00", "#FFBB28"];

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col">
      {/* Texto explicativo da tela */}
      <div className="flex items-center p-4 gap-3 absolute top-20 left-72">
        <MdOutlineSpaceDashboard className="h-9 w-9 text-green-600 animate-pulse" />
       <h1 className="text-2xl md:text-3xl font-bold text-gray-700 text-left">Painel Principal da Empresa</h1>
      </div>

        {/* Gráficos organizados em grid responsivo */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 mt-36">
          {/* Locais */}
          <div className="bg-white p-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl w-full">
            <div className="flex items-center justify-center gap-5 mb-4">
              <h2 className="text-lg font-semibold mb-4 text-center">Locais com Mais Relatos</h2>
              <PiCity className="shadow-lg p-1 h-9 w-9 mb-3 bg-[#82ca9d] text-white rounded" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="relatos" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Meses */}
          <div className="bg-white p-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl w-full">
            <div className="flex items-center justify-center gap-5 mb-4">
              <h2 className="text-lg font-semibold mb-4 text-center">Meses com Mais Recolhas</h2>
              <MdOutlineCalendarMonth className="shadow-lg p-1 h-9 w-9 mb-3 bg-[#8884d8] text-white rounded" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="coletados" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tipos de lixo */}
          <div className="bg-white p-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl w-full">
            <div className="flex items-center justify-center gap-5 mb-4">
              <h2 className="text-lg font-semibold mb-4 text-center">Tipos de Lixo Mais Retirados</h2>
              <MdOutlineMergeType className="shadow-lg p-1 h-9 w-9 mb-3 bg-[#FFBB28] text-white rounded" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={wasteTypesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {wasteTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

          {/* Gráfico: Fluxo de Recolha */}
          <div className="bg-white p-6 shadow hover:shadow-lg transition-all duration-300 rounded-2xl w-full max-w-6xl mb-20">
            <div className="flex items-center justify-start gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">Fluxo de Recolha de Lixo por Semana</h2>
              <FaRecycle className="h-9 w-9 bg-[#06D6A0] text-white rounded p-1 shadow-lg" />
            </div>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart
                data={fluxoRecolhaData}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="etapa" tick={{ fill: "#555" }} />
                <YAxis tick={{ fill: "#555" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f9f9f9", borderColor: "#ddd" }}
                  formatter={(value: any, name: string) => {
                    const labels: any = {
                      Agendado: "Recolhas Agendadas",
                      EmAndamento: "Em Andamento",
                      Concluído: "Concluídas"
                    };
                    return [`${value}`, labels[name] || name];
                  }}
                />
                <Legend
                  formatter={(value) => {
                    const labels: any = {
                      Agendado: "Agendadas",
                      EmAndamento: "Em Andamento",
                      Concluído: "Concluídas"
                    };
                    return <span className="text-gray-700">{labels[value]}</span>;
                  }}
                />
                <Bar dataKey="Agendado" stackId="a" fill="#FFD166" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EmAndamento" stackId="a" fill="#83B9FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Concluído" stackId="a" fill="#06D6A0" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
                </div>
      </div>
    </div>
  );
}
