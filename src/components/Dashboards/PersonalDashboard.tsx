import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AnimationDuration } from "recharts";
//eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfaWI5dHY0eXkiLCJqdGkiOiIyZjBlZjIzNiJ9.xUM68ikF9MBHfhxuJb0gNI_RMwFk1vbDCrbWKv00Tlo (token de acesso da API da carto dos mapas)

export default function PersonalDashboard() {
  const locationsData = [
    { name: "Centro da Cidade", relatos: 120 },
    { name: "Mutamba", relatos: 85 },
    { name: "Viana", relatos: 65 },
  ];
  
  const wasteTypesData = [
    { name: "Plástico", value: 26 },
    { name: "Orgânico", value: 38 },
    { name: "Metal", value: 10 },
  ];
  
  const COLORS = ["#FF0000", "#964B00", "#FFBB28"];
  
  const totalRelatos = locationsData.reduce((total, item) => total + item.relatos, 0);
  const totalWaste = wasteTypesData.reduce((total, item) => total + item.value, 0);

  return (
    <div className="flex justify-center items-center mt-12">
      {/* Conteúdo principal */}
      <div className="w-full">

        {/* Seção de Total de Relatos */}
        <div className="bg-white p-6 shadow rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4 text-center">Total de Relatos</h2>
          <p className="text-center text-lg font-medium">Total de relatos registrados: <span className="text-blue-600">{totalRelatos}</span></p>
        </div>

        {/* Gráficos organizados em grid responsivo */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Gráfico de Locais com Mais Relatos */}
          <div className="bg-white p-4 shadow rounded-xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Locais com Mais Relatos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationsData} animationDuration={1000}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="relatos" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Tipos de Lixo Mais Retirados */}
          <div className="bg-white p-4 shadow rounded-xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Tipos de Lixo Mais Retirados</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart animationDuration={1000}>
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

        {/* Seção de Estatísticas Adicionais */}
        <div className="bg-white p-6 shadow rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4 text-center">Estatísticas de Tipos de Lixo</h2>
          <div className="flex justify-around">
            {wasteTypesData.map((item, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-xl text-blue-500">{((item.value / totalWaste) * 100).toFixed(2)}%</p>
                <p className="text-gray-600">Total: {item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa interativo (apenas como exemplo) */}
        <div className="bg-white p-6 shadow rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4 text-center">Mapa de Localizações</h2>
          {/* Aqui você pode adicionar um mapa interativo utilizando a API Carto */}
          <div className="w-full h-96 bg-gray-300 flex justify-center items-center">
            <p className="text-lg text-gray-600">Mapa interativo aqui (em integração com a API Carto)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
