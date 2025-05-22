import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryButton from './ui/PrimaryButton';
import { TbReport } from "react-icons/tb";
import axios from '../lib/axios';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Relato {
  id: string;
  imagem?: string;
  data: string; // ISO string ou formato conhecido
  localizacao: string;
  prioridade: 'Alta' | 'Baixa';
  status: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO';
}

const Relatorio = () => {
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [relatosFiltrados, setRelatosFiltrados] = useState<Relato[]>([]);
  const [relatoSelecionado, setRelatoSelecionado] = useState<Relato | null>(null);

  // Filtros
  const [filtroStatus, setFiltroStatus] = useState<string>("TODOS");
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("TODAS");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);

  useEffect(() => {
    const buscarRelatos = async () => {
      try {
        const res = await axios.get(`/relatorio`);
        setRelatos(res.data);
      } catch (error) {
        alert("Erro ao buscar relatos");
      }
    };
    buscarRelatos();
  }, []);

  useEffect(() => {
    filtrarRelatos();
  }, [relatos, filtroStatus, filtroPrioridade, dataInicio, dataFim]);

  const filtrarRelatos = () => {
    let filtrados = [...relatos];

    if (filtroStatus !== "TODOS") {
      filtrados = filtrados.filter(r => r.status === filtroStatus);
    }

    if (filtroPrioridade !== "TODAS") {
      filtrados = filtrados.filter(r => r.prioridade === filtroPrioridade);
    }

    if (dataInicio) {
      filtrados = filtrados.filter(r => new Date(r.data) >= dataInicio);
    }

    if (dataFim) {
      filtrados = filtrados.filter(r => new Date(r.data) <= dataFim);
    }

    setRelatosFiltrados(filtrados);
  };

  const resetFiltros = () => {
    setFiltroStatus("TODOS");
    setFiltroPrioridade("TODAS");
    setDataInicio(null);
    setDataFim(null);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Relatório de Relatos Recebidos', 20, 20);
    doc.setFontSize(10);

    const tableTop = 30;
    const rowHeight = 10;

    doc.setFillColor(220, 220, 220);
    doc.rect(20, tableTop, 170, rowHeight, 'F');
    doc.text('ID', 22, tableTop + 7);
    doc.text('Data', 35, tableTop + 7);
    doc.text('Localização', 80, tableTop + 7);
    doc.text('Prioridade', 130, tableTop + 7);
    doc.text('Status', 160, tableTop + 7);

    relatosFiltrados.forEach((relato, i) => {
      const y = tableTop + rowHeight * (i + 1);
      if (y > 280) doc.addPage();
      doc.text(`${relato.id}`, 22, y + 7);
      doc.text(relato.data, 35, y + 7);
      doc.text(relato.localizacao, 80, y + 7);
      doc.text(relato.prioridade, 130, y + 7);
      doc.text(relato.status, 160, y + 7);
    });

    doc.save('relatorio.pdf');
  };

  const exportToExcel = () => {
    const dataFormatada = relatosFiltrados.map(r => ({
      ID: r.id,
      Data: r.data,
      Localização: r.localizacao,
      Prioridade: r.prioridade,
      Status: r.status,
    }));

    const ws = XLSX.utils.json_to_sheet(dataFormatada);
    ws['!cols'] = [
      { wch: 5 }, { wch: 20 }, { wch: 30 }, { wch: 12 }, { wch: 12 }
    ];
    ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }) };

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatos');
    XLSX.writeFile(wb, 'relatorio.xlsx');
  };

  const getCorPrioridade = (p: string) =>
    p === 'Alta' ? 'bg-red-500' : 'bg-green-500';

  const getCorStatus = (s: string) => {
    switch (s) {
      case 'PENDENTE': return 'bg-yellow-400';
      case 'NAO_RETIRADO': return 'bg-red-400';
      case 'RETIRADO': return 'bg-green-400';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="p-6 md:p-10 mt-12">
      <div className="flex items-center gap-3 mb-8">
        <TbReport size={28} className="text-green-600 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel dos Relatos Recebidos</h1>
      </div>

      {/* Exportação */}
      <div className="flex gap-4 mb-6">
        <button onClick={exportToPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Exportar PDF</button>
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Exportar Excel</button>
      </div>

      {/* Filtros Avançados */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          title='status'
          value={filtroStatus}
          onChange={e => setFiltroStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="NAO_RETIRADO">Não Retirado</option>
          <option value="RETIRADO">Retirado</option>
        </select>

        <select
          title='prioridade'
          value={filtroPrioridade}
          onChange={e => setFiltroPrioridade(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="TODAS">Todas Prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Baixa">Baixa</option>
        </select>

        <div className="flex items-center gap-2">
          <span>De:</span>
          <DatePicker
            selected={dataInicio}
            onChange={date => setDataInicio(date)}
            dateFormat="yyyy-MM-dd"
            className="border px-2 py-1 rounded"
          />
          <span>Até:</span>
          <DatePicker
            selected={dataFim}
            onChange={date => setDataFim(date)}
            dateFormat="yyyy-MM-dd"
            className="border px-2 py-1 rounded"
          />
        </div>

        <button onClick={resetFiltros} className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded">
          Limpar Filtros
        </button>
      </div>

      {/* Lista de relatos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatosFiltrados.map(relato => (
          <motion.div
            key={relato.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
          >
            <div className="flex p-4 gap-4 items-center">
              <img
                src={relato.imagem || './mine.png'}
                alt="Imagem do relato"
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div className="text-sm">
                <p><strong>Data:</strong> {relato.data}</p>
                <p><strong>Local:</strong> {relato.localizacao}</p>
                <p>
                  <strong>Prioridade:</strong>{' '}
                  <span className={`text-white px-2 py-1 rounded text-xs ${getCorPrioridade(relato.prioridade)}`}>
                    {relato.prioridade}
                  </span>
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`text-white px-2 py-1 rounded text-xs ${getCorStatus(relato.status)}`}>
                    {relato.status}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Relatorio;
