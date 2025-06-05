import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TbReport } from "react-icons/tb";
import { FaDownload } from "react-icons/fa6";
import axios from '../lib/axios';
import Toast from './ui/Toast';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface Relato {
  id: string;
  imagem?: string;
  data: string;
  localizacao: string;
  prioridade: 'Alta' | 'Baixa';
  status: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO';
  userId?: string;
}

const Relatorio = () => {
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [relatosFiltrados, setRelatosFiltrados] = useState<Relato[]>([]);
  const [statusTemp, setStatusTemp] = useState<Record<string, Relato['status']>>({});
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [prioridadeFilter, setPrioridadeFilter] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [relatoSelecionado, setRelatoSelecionado] = useState<Relato | null>(null);

  const dadosEstáticos: Relato[] = [
    {
      id: "1",
      data: "2025-05-20",
      imagem: "./mine.png",
      localizacao: "Bairro Morro Bento",
      prioridade: "Alta",
      status: "PENDENTE",
    },
    {
      id: "2",
      data: "2025-05-18",
      imagem: "./mine.png",
      localizacao: "Cidade Alta",
      prioridade: "Baixa",
      status: "RETIRADO",
    },
  ];

  useEffect(() => {
    const buscarRelatos = async () => {
      try {
        const res = await axios.get(`/relatorio-coleta/:id/status`);
        setRelatos(res.data);
        setRelatosFiltrados(res.data);
      } catch (error) {
        console.error("Erro na API, usando dados estáticos.");
        setRelatos(dadosEstáticos);
        setRelatosFiltrados(dadosEstáticos);
      }
    };
    buscarRelatos();
  }, []);

  useEffect(() => {
    const filtrados = relatos.filter((r) => {
      const passaStatus = !statusFilter || r.status === statusFilter;
      const passaPrioridade = !prioridadeFilter || r.prioridade === prioridadeFilter;
      return passaStatus && passaPrioridade;
    });
    setRelatosFiltrados(filtrados);
  }, [statusFilter, prioridadeFilter, relatos]);

  const handleStatusChange = async (relatoId: string) => {
    const novoStatus = statusTemp[relatoId];
    if (!novoStatus) return;

    try {
      await axios.put(`/relatorio/${relatoId}/status`, { status: novoStatus });
      setRelatos(prev => prev.map(r => r.id === relatoId ? { ...r, status: novoStatus } : r));
      setToast({ message: "Status atualizado com sucesso!", type: 'success' });
      setRelatoSelecionado(null);
    } catch (err) {
      setToast({ message: "Erro ao atualizar status.", type: 'error' });
    }
  };

  const getCorPrioridade = (p: string) => p === 'Alta' ? 'bg-red-500' : 'bg-green-500';
  const getCorStatus = (s: string) => {
    switch (s) {
      case 'PENDENTE': return 'bg-yellow-400';
      case 'NAO_RETIRADO': return 'bg-red-400';
      case 'RETIRADO': return 'bg-green-400';
      default: return 'bg-gray-300';
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Relatório de Relatos Recebidos', 20, 20);
    const rowHeight = 10;
    doc.setFillColor(220, 220, 220);
    doc.rect(20, 30, 170, rowHeight, 'F');
    doc.text('ID', 22, 37);
    doc.text('Data', 35, 37);
    doc.text('Localização', 80, 37);
    doc.text('Prioridade', 130, 37);
    doc.text('Status', 160, 37);
    relatosFiltrados.forEach((r, i) => {
      const y = 40 + i * rowHeight;
      if (y > 280) doc.addPage();
      doc.text(r.id, 22, y);
      doc.text(r.data, 35, y);
      doc.text(r.localizacao, 80, y);
      doc.text(r.prioridade, 130, y);
      doc.text(r.status, 160, y);
    });
    doc.save('relatorio.pdf');
  };

  const exportToExcel = () => {
    const dados = relatosFiltrados.map(r => ({
      ID: r.id,
      Data: r.data,
      Localização: r.localizacao,
      Prioridade: r.prioridade,
      Status: r.status,
    }));
    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatos');
    XLSX.writeFile(wb, 'relatorio.xlsx');
  };

  return (
    <div className="p-6 md:p-10 mt-12 relative">
      <div className="flex items-center gap-3 mb-8">
        <TbReport size={28} className="text-green-600 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel de Relatórios</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <label htmlFor="status-filter" className="sr-only">Filtrar por status</label>
        <select
          id="status-filter"
          aria-label="Filtrar por status"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todos os Status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="NAO_RETIRADO">Não Retirado</option>
          <option value="RETIRADO">Retirado</option>
        </select>

        <label htmlFor="prioridade-filter" className="sr-only">Filtrar por prioridade</label>
        <select
          id="prioridade-filter"
          aria-label="Filtrar por prioridade"
          value={prioridadeFilter}
          onChange={e => setPrioridadeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas as Prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
        type='button'
        onClick={exportToPDF} 
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
          <FaDownload />
          Exportar PDF
        </button>

        <button 
        type='button'
        onClick={exportToExcel} 
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded">
          <FaDownload />
          Exportar Excel
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatosFiltrados.map(relato => (
          <motion.div
            key={relato.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setRelatoSelecionado(relato)}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex gap-4">
              <img src={relato.imagem || './mine.png'} alt={`Imagem do relato ${relato.id}`} className="w-24 h-24 object-cover rounded-md border"  />
              <div className="text-sm space-y-1">
                <p><strong>Data:</strong> {relato.data}</p>
                <p><strong>Local:</strong> {relato.localizacao}</p>
                <p><strong>Prioridade:</strong> <span className={`text-white px-2 py-1 rounded animate-pulse text-xs ${getCorPrioridade(relato.prioridade)}`}>{relato.prioridade}</span></p>
                <p><strong>Status:</strong> <span className={`text-white px-2 py-1 rounded animate-pulse text-xs ${getCorStatus(relato.status)}`}>{relato.status}</span></p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      {relatoSelecionado && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative"
    >
      <button
        type="button"
        onClick={() => setRelatoSelecionado(null)}
        className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 text-xl font-bold transition"
        aria-label="Fechar modal"
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold text-black mb-4 border-b pb-2">
        Detalhes do Relato
      </h2>

      <img
        src={relatoSelecionado.imagem || './mine.png'}
        alt="Imagem do relato"
        className="w-full h-52 object-cover rounded-lg mb-5 border"
      />

      <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-600">
        <p><strong>📅 Data:</strong> {relatoSelecionado.data}</p>
        <p><strong>📍 Localização:</strong> {relatoSelecionado.localizacao}</p>
        <p>
          <strong>🚨 Prioridade:</strong>{' '}
          <span className={`px-2 py-1 rounded text-white animate-pulse text-xs ${getCorPrioridade(relatoSelecionado.prioridade)}`}>
            {relatoSelecionado.prioridade}
          </span>
        </p>
        <p>
          <strong>📌 Status Atual:</strong>{' '}
          <span className={`px-2 py-1 rounded text-white animate-pulse text-xs ${getCorStatus(relatoSelecionado.status)}`}>
            {relatoSelecionado.status}
          </span>
        </p>
      </div>

      <div className="mt-5">
        <label htmlFor="status-select" className="text-sm font-medium mb-1 block">
          Alterar status:
        </label>
        <select
          id="status-select"
          value={statusTemp[relatoSelecionado.id] || relatoSelecionado.status}
          onChange={(e) =>
            setStatusTemp({
              ...statusTemp,
              [relatoSelecionado.id]: e.target.value as Relato['status'],
            })
          }
          className="w-full border cursor-pointer border-zinc-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="PENDENTE">Pendente</option>
          <option value="NAO_RETIRADO">Não Retirado</option>
          <option value="RETIRADO">Retirado</option>
        </select>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setRelatoSelecionado(null)}
          className="px-4 py-2 rounded-md bg-zinc-200 hover:bg-zinc-300 text-zinc-800 transition dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={() => handleStatusChange(relatoSelecionado.id)}
          className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
        >
          Confirmar Alteração
        </button>
      </div>
    </motion.div>
  </div>
)}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Relatorio;
