import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


export default function PersonalDashboard() {
  const locationsData = [
    { name: "Centro da Cidade", relatos: 120 },
    { name: "Mutamba", relatos: 85 },
    { name: "Viana", relatos: 65 },
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
  return (
    <div className="">
      {/* Conteúdo principal */}
      <div className="flex justify-center items-center flex-col">

        <div className="mt-12 rounded shadow-lg bg-green-100 py-6 px-6">
           <h1 className="font-extrabold text-2xl">Seja bem-vinda Txela!</h1>
        </div>

        {/* Totais vistos */}

        <div className="mt-12 flex justify-center items-center gap-8">
 
        <div className="flex gap-3 rounded shadow-lg p-4 duration-300 transform hover:scale-105">
         <h3 className="text-lg font-semibold">Total de usuários:</h3>
         <span className="text-lg">10</span>
        </div>

        <div className="flex gap-3 rounded-md shadow-lg p-4 duration-300 transform hover:scale-105">
          <h3 className="text-lg font-semibold">Total de relatos:</h3>
          <span className="text-lg">0</span>
        </div>
  
        </div>

        {/* Gráficos organizados em grid responsivo */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 mt-20">
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
      </div>
      
    </div>
  )
}