import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import { useEffect, useState } from "react";
import { userService } from "../../modules/service/api/user";
import { empresaService } from "../../modules/service/api/empresa";
import { relatarService } from "../../modules/service/api/relatar";
//import { recolhaService } from "../../modules/service/api/recolha";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [relatos, setRelatos] = useState([]);
  const [recolhas, setRecolhas] = useState([]);

  // Gráficos estáticos (pode substituir depois por dados dinâmicos)
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

  useEffect(() => {
    userService.getAll().then(res => setUsers(res.data));
    empresaService.getAll().then(res => setEmpresas(res.data));
    relatarService.getAll().then(res => setRelatos(res.data));
  }, []);

  return (
    <div className="p-6">
      {/* Indicadores numéricos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500 font-semibold">Usuários Cadastrados</h3>
          <p className="text-2xl font-bold text-green-600">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500 font-semibold">Empresas Ativas</h3>
          <p className="text-2xl font-bold text-green-600">{empresas.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500 font-semibold">Relatos Recebidos</h3>
          <p className="text-2xl font-bold text-green-600">{relatos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h3 className="text-sm text-gray-500 font-semibold">Recolhas Concluídas</h3>
          <p className="text-2xl font-bold text-green-600">{recolhas.length}</p>
        </div>
      </div>

      {/* Gráficos organizados em grid responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
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

        <div className="bg-white p-4 shadow rounded-xl w-full md:col-span-2 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4 text-center">Evolução dos Relatos por Mês</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="coletados" stroke="#00C49F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lista de últimos relatos */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Últimos Relatos</h2>
        <ul className="divide-y divide-gray-200">
          {relatos.slice(-5).reverse().map((r: any, idx) => (
            <li key={idx} className="py-2 flex justify-between">
              <span>{r.municipio?.nome} - {new Date(r.createdAt).toLocaleDateString()}</span>
              <span className={`text-sm px-2 rounded ${r.status === "Pendente" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
