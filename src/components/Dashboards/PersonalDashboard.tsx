import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MdOutlineSpaceDashboard } from 'react-icons/md';

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
  
  //const totalRelatos = locationsData.reduce((total, item) => total + item.relatos, 0);
  const totalWaste = wasteTypesData.reduce((total, item) => total + item.value, 0);

  return (
    <div className="flex justify-center items-center mt-40">
      {/* Texto explicativo da tela */}
      <div className="flex items-center p-4 gap-3 absolute top-20 left-72">
        <MdOutlineSpaceDashboard className="h-9 w-9" />
        <h1 className="text-xl md:text-2xl font-semibold text-left">Painel Principal do Cidadão</h1>
      </div>

      {/* Conteúdo principal */}
      <div className="w-full">

          {/* Mapa com iframe mostrando locais com mais relatos de lixo */}
          <div className="bg-white p-4 shadow rounded-xl hover:shadow-lg transition-all duration-300 w-full mb-10">
          <h2 className="text-lg font-semibold mb-4 text-start">Mapa de Locais com Mais Relatos</h2>
          <div className="w-full h-[400px]">
            <iframe
              title="Mapa de Relatos"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.852600974177!2d13.234638874213565!3d-8.83833349098954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a5202c7b054cced%3A0xd841420bde3ebd48!2sCentro%20de%20Luanda!5e0!3m2!1spt-BR!2sao!4v1685659876543!5m2!1spt-BR!2sao"
              className="w-full h-full border"
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Gráficos organizados em grid responsivo */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Gráfico de Locais com Mais Relatos */}
          <div className="bg-white p-4 shadow rounded-xl hover:shadow-lg transition-all duration-300 w-full">
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

          {/* Gráfico de Tipos de Lixo Mais Retirados */}
          <div className="bg-white p-4 shadow rounded-xl hover:shadow-lg transition-all duration-300 w-full">
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

        {/* Seção de Estatísticas */}
        <div className="bg-white p-6 shadow hover:shadow-lg transition-all duration-300 rounded-xl mb-10">
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

      </div>
    </div>
  );
}
