import { useState, useEffect } from "react";
import { MdOutlineCalendarMonth, MdAccessTime, MdInfoOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { agendarService } from "../modules/service/api/agendar/index";
import Toast from "./ui/Toast";
import axios from "../lib/axios";
import { FaDownload } from "react-icons/fa6";
import { BsClockHistory } from "react-icons/bs";

interface Agendamento {
  empresaId: string;
  start_time: string;
  end_time: string;
  contexto: string;
  createAt: string;
}

function Agendar() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [form, setForm] = useState({
    empresaId: "",
    contexto: "",
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    agendarService
      .getAll({
        contexto: form.contexto,
        empresaId: form.empresaId,
        start_time: form.start_time,
        end_time: form.end_time,
      })
      .then((res) => setAgendamentos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAgendar = async () => {
    const now = new Date();
    const start = new Date(form.start_time);
    const end = new Date(form.end_time);

    if (!form.contexto.trim() || !form.start_time || !form.end_time) {
      setToast({ message: "Por favor, preencha todos os dados correctamente.", type: "error" });
      return;
    }

    if (start < now) {
      setToast({ message: "A data de início não pode estar no passado.", type: "error" });
      return;
    }

    if (end <= start) {
      setToast({ message: "A data de fim deve ser posterior à data de início.", type: "error" });
      return;
    }

    const diasDistantes = (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (diasDistantes > 30) {
      setToast({
        message: "Atenção: Esta atividade está agendada para mais de 30 dias no futuro.",
        type: "success",
      });
    }

    if (!/^[A-Za-zÀ-ÿ0-9]+(?: [A-Za-zÀ-ÿ0-9]+)*$/.test(form.contexto)) {
      setToast({ message: "Por favor, insira um contexto válido (sem apenas espaços).", type: "error" });
      return;
    }    

    const empresaId = localStorage.getItem("empresaId");
    if (!empresaId) {
      setToast({ message: "Empresa não identificada. Faça login novamente.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/agendar", {
        ...form,
        empresaId,
      });
      setAgendamentos((prev) => [res.data, ...prev]);
      setForm({ contexto: "", start_time: "", end_time: "", empresaId: "" });
      setToast({ message: "Agendamento criado com sucesso!", type: "success" });
    } catch (err) {
      console.error("Erro ao criar agendamento.", err);
      setToast({ message: "Erro ao criar agendamento. Tente novamente.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const exportarCSV = () => {
    const header = ["Contexto", "Início", "Fim", "Criado em"];
    const rows = agendamentos.map((a) => [
      `"${a.contexto.replace(/"/g, '""')}"`,
      `"${format(new Date(a.start_time), "dd/MM/yyyy HH:mm")}"`,
      `"${format(new Date(a.end_time), "dd/MM/yyyy HH:mm")}"`,
      `"${format(new Date(a.createAt), "dd/MM/yyyy HH:mm")}"`,
    ]);

    const csvContent =
      "\uFEFF" +
      header.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

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
        <h1 className="text-3xl font-bold text-gray-700">Painel de Atividades Agendadas</h1>
      </div>

      {/* Formulário */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Agendar nova atividade</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Contexto da atividade</label>
            <textarea
              placeholder="Descreva o contexto"
              className="p-2 w-full rounded border"
              value={form.contexto}
              onChange={(e) => setForm({ ...form, contexto: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Data e hora de início</label>
            <input
              title="start"
              type="datetime-local"
              className="p-2 w-full rounded border"
              value={form.start_time}
              onChange={(e) => setForm({ ...form, start_time: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Data e hora de fim</label>
            <input
              title="end"
              type="datetime-local"
              className="p-2 w-full rounded border"
              value={form.end_time}
              onChange={(e) => setForm({ ...form, end_time: e.target.value })}
            />
          </div>
        </div>

        {/* Aviso de data futura */}
        {form.start_time &&
          (() => {
            const dias = (new Date(form.start_time).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
            if (dias > 30) {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-yellow-100 text-yellow-800 p-3 rounded mt-4 border border-yellow-300"
                >
                  ⚠️ Lembrete: Esta atividade está agendada para daqui a mais de <strong>{Math.round(dias)}</strong> dias.
                </motion.div>
              );
            }
            return null;
          })()}

        <button
          type="button"
          onClick={handleAgendar}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          {loading ? "Agendando..." : "Agendar"}
        </button>
      </div>

      {/* Lista de Agendamentos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Atividades Agendadas</h2>
          <button
            type="button"
            onClick={exportarCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >
            <FaDownload className="text-sm" />
            Exportar CSV
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {agendamentos.map((item) => {
            const expirado = new Date(item.end_time) < new Date();

            return (
              <motion.div
                key={item.createAt}
                className={`relative bg-white p-4 rounded-lg shadow-md border-l-4 ${
                  expirado ? "border-red-500" : "border-green-500"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {expirado && (
                  <span className="absolute top-2 right-2 text-red-500 text-xs font-semibold flex items-center gap-1">
                    <BsClockHistory className="text-sm" /> Expirado
                  </span>
                )}
                <p className="text-sm text-gray-700 font-semibold mb-2">{item.contexto}</p>
                <p className="text-sm flex items-center gap-2">
                  <MdAccessTime /> Início:{" "}
                  <strong>{format(new Date(item.start_time), "dd/MM/yyyy HH:mm")}</strong>
                </p>
                <p className="text-sm flex items-center gap-2">
                  <MdAccessTime /> Fim:{" "}
                  <strong>{format(new Date(item.end_time), "dd/MM/yyyy HH:mm")}</strong>
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <MdInfoOutline /> Criado em: {format(new Date(item.createAt), "dd/MM/yyyy HH:mm")}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Agendar;
