import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import { useEffect, useState } from "react";
import { userService } from "../../modules/service/api/user";
import { empresaService } from "../../modules/service/api/empresa";
import { relatarService } from "../../modules/service/api/relatar";
import { IoBusinessOutline, IoPeopleOutline, IoWarningOutline, IoDocumentTextOutline } from "react-icons/io5";
//import { recolhaService } from "../../modules/service/api/recolha";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [relatos, setRelatos] = useState([]);
  const [recolhas, setRecolhas] = useState([]);

  useEffect(() => {
    userService.getAll().then(response => setUsers(response.data));
    empresaService.getAll().then(response => setEmpresas(response.data));
    relatarService.getAll().then(response => setRelatos(response.data));
  }, []);

    // Preparando os dados para o gráfico de Estatísticas do Sistema
  const statisticsData = [
    { name: "Usuários", value: users.length },
    { name: "Empresas", value: empresas.length },
    { name: "Relatos", value: relatos.length },
    { name: "Recolhas", value: recolhas.length },
  ];

  return (
    <div className="p-6">
      {/* Indicadores numéricos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        
        {/* Seção Users */}
        <div className="bg-white p-4 text-center flex items-center space-x-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl">
          <div className="bg-gray-100 p-3 rounded-md">
            <IoPeopleOutline size={36} color="green" className="" />
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-sm text-gray-500 font-semibold">Usuários Cadastrados</h3>
            <p className="text-2xl font-bold text-green-600">{users.length}</p>
          </div>
        </div>

        {/* Seção Empresa */}
        <div className="bg-white p-4 text-center flex items-center space-x-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl">
          <div className="bg-gray-100 p-3 rounded-md">
            <IoBusinessOutline size={36} color="green" className="" />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-sm text-gray-500 font-semibold">Empresas Ativas</h3>
          <p className="text-2xl font-bold text-green-600">{empresas.length}</p>
          </div>
        </div>

        {/* Seção Relatos Feitos */}
        <div className="bg-white p-4 text-center flex items-center space-x-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl">
          <div className="bg-gray-100 p-3 rounded-md">
            <IoWarningOutline size={36} color="green" className="" />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-sm text-gray-500 font-semibold">Relatos Feitos</h3>
            <p className="text-2xl font-bold text-green-600">{relatos.length}</p>
          </div>
        </div>

        {/* Seção Relatos Resolvidos */}
        <div className="bg-white p-4 text-center flex items-center space-x-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl">
          <div className="bg-gray-100 p-3 rounded-md">
            <IoDocumentTextOutline size={36} color="green" className="" />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-sm text-gray-500 font-semibold">Relatos Resolvidos</h3>
            <p className="text-2xl font-bold text-green-600">{recolhas.length}</p>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col justify-center items-center gap-8 mt-16 w-full">
        {/* Gráfico único com estatísticas */}
        <div className="bg-white p-4 shadow hover:shadow-lg transition-all duration-300 rounded-xl w-full">
          <h2 className="text-lg font-semibold mb-4 text-center">Estatísticas do Sistema</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statisticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lista de últimos relatos */}
        <div className="bg-white p-6 shadow hover:shadow-lg transition-all duration-300 rounded-xl w-full">
          <h2 className="text-lg font-semibold mb-4">Últimos Relatos</h2>
          <ul className="divide-y divide-gray-200">
            {relatos.slice(-5).reverse().map((r: any, idx) => (
              <li key={idx} className="py-3 flex justify-between">
                <span>{r.municipio?.nome} - {new Date(r.createdAt).toLocaleDateString()}</span>
                <span className={`text-sm px-2 rounded ${r.status === "Pendente" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

  </div>
  );
}
