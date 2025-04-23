import { useState, useEffect } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { agendarService } from "../modules/service/api/agendar/index";
import Toast from "./ui/Toast";
import axios from "../lib/axios";

interface Agendamento {
  empresaId: string;
  start_time: string;
  end_time: string;
  contexto: string;
  createAt: string;
}

function Agendar() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; } | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [form, setForm] = useState({
    empresaId: "74cd7463-0d3d-4045-bbd6-03df6364988e",
    contexto: "",
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    agendarService.getAll({ 
      contexto: form.contexto,
      empresaId: form.empresaId,  
      start_time: form.start_time, 
      end_time: form.end_time 
    })
      .then(res => setAgendamentos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAgendar = async () => {
    if (!form.contexto || !form.start_time || !form.end_time) {
      setToast({ message: "Por favor,preencha todos os dados.", type: "error" })
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/agendar", form);
      setAgendamentos(prev => [res.data, ...prev]);
      setForm({ contexto: "", start_time: "", end_time: "", empresaId: "" });
    } catch (err) {
      console.error("Erro ao criar agendamento.",err);
      setToast({ message: "Erro ao criar agendamento. Tente novamente.", type: "error" })
    } finally {
      setLoading(false);
    }
  };

  const exportarCSV = () => {
    const header = ['Contexto', 'Início', 'Fim', 'Criado em'];
    
    const rows = agendamentos.map(a => [
      `"${a.contexto.replace(/"/g, '""')}"`,
      `"${format(new Date(a.start_time), 'dd/MM/yyyy HH:mm')}"`,
      `"${format(new Date(a.end_time), 'dd/MM/yyyy HH:mm')}"`,
      `"${format(new Date(a.createAt), 'dd/MM/yyyy HH:mm')}"`
    ]);
  
    // Monta o conteúdo CSV com BOM para suportar acentuação no Excel
    const csvContent =
      '\uFEFF' + // BOM (Byte Order Mark)
      header.join(',') + '\n' +
      rows.map(row => row.join(',')).join('\n');
  
    // Cria o arquivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Agendamentos_GreenWorld.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen p-6 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <MdOutlineCalendarMonth className="h-9 w-9 text-green-600 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel de Actividades Agendadas</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md duration-300 mb-10">
        <h2 className="text-xl font-semibold mb-4">Agendar nova atividade</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Contexto da atividade</label>
            <textarea
              placeholder="Descreva o contexto"
              className="p-2 w-full rounded border"
              value={form.contexto}
              onChange={e => setForm({ ...form, contexto: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Data e hora de início</label>
            <input
              title="time-start"
              type="datetime-local"
              className="p-2 w-full rounded border"
              value={form.start_time}
              onChange={e => setForm({ ...form, start_time: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Data e hora de fim</label>
            <input
              title="time-end"
              type="datetime-local"
              className="p-2 w-full rounded border"
              value={form.end_time}
              onChange={e => setForm({ ...form, end_time: e.target.value })}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleAgendar}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          {loading ? "Agendando..." : "Agendar"}
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Atividades Agendadas</h2>
          <button
            type="button"
            onClick={exportarCSV}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >
            Exportar CSV
          </button>
        </div>

        <div className="grid gap-4">
          {agendamentos.map(item => (
            <motion.div
              key={item.createAt}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm  dark:text-gray-700 mb-2">
                {item.contexto}
              </p>
              <p className="text-sm">
                🕒 Início: <strong>{new Date(item.start_time).toLocaleString()}</strong>
              </p>
              <p className="text-sm">
                🕓 Fim: <strong>{new Date(item.end_time).toLocaleString()}</strong>
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Criado em: {new Date(item.createAt).toLocaleString()}
              </p>
            </motion.div>
          ))}

          {/* Exibe o Toast se houver mensagem */}
          {toast && (
          <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          />
          )}
        </div>
      </div>
    </div>
  );
}

export default Agendar;