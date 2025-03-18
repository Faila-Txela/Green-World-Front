import Sidebar from "../../components/Sidebar";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Map from "../../components/Map";
import Relatos from "../../components/Relatos";
import "leaflet/dist/leaflet.css";

 //https://www.google.com/maps/@-8.8333099,13.2571516,15z?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D

const locationsData = [
  { name: "Centro da Cidade", relatos: 120, lat: -8.864, lon: 13.56 },
  { name: "Mutamba", relatos: 85, lat: -8.864, lon: 13.56 },
  { name: "Viana", relatos: 65, lat: -8.864, lon: 13.56 },
];

const monthsData = [
  { name: "Janeiro", coletados: 80 },
  { name: "Fevereiro", coletados: 45 },
  { name: "Março", coletados: 10 },
];

const wasteTypesData = [
  { name: "Plástico", value: 26 },
  { name: "Orgânico", value: 38 },
  { name: "Metal", value: 10 },
];

const COLORS = ["#FF0000", "#964B00", "#FFBB28"];

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex justify-center items-center flex-col">
          <div>
            <Map />
          </div>

        {/* Gráficos organizados em grid responsivo */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Gráfico de Locais com Mais Relatos */}
          <div className="bg-white p-4 shadow rounded-xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Locais com Mais Relatos</h2>
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

          {/* Gráfico de Meses com Mais Recolhas */}
          <div className="bg-white p-4 shadow rounded-xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Meses com Mais Recolhas</h2>
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

          {/* Gráfico de Tipos de Lixo Mais Retirados */}
          <div className="bg-white p-4 shadow rounded-xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Tipos de Lixo Mais Retirados</h2>
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
        <div className="">
        <Relatos />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


