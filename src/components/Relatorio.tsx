import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface Relato {
  id: number;
  imagem: string;
  data: string;
  localizacao: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Validado' | 'Pendente';
}

const Relatorio = () => {
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [relatoSelecionado, setRelatoSelecionado] = useState<Relato | null>(null);

  useEffect(() => {
    const dadosFake: Relato[] = [
      {
        id: 1,
        imagem: 'https://via.placeholder.com/300x200',
        data: '2025-04-12 10:35',
        localizacao: 'Luanda, Maianga',
        prioridade: 'Alta',
        status: 'Validado',
      },
      {
        id: 2,
        imagem: 'https://via.placeholder.com/300x200',
        data: '2025-04-11 14:20',
        localizacao: 'Cazenga, Rua 14',
        prioridade: 'Média',
        status: 'Pendente',
      },
    ];
    setRelatos(dadosFake);
  }, []);

  const getPrioridadeCor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta': return 'bg-red-500 text-white';
      case 'Média': return 'bg-yellow-400 text-black';
      case 'Baixa': return 'bg-green-500 text-white';
      default: return 'bg-gray-300';
    }
  };

  const getStatusCor = (status: string) => {
    return status === 'Validado'
      ? 'bg-blue-500 text-white'
      : 'bg-gray-300 text-black';
  };

  // Função para exportar para PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
  
    doc.text('Relatório de Relatos Recebidos', 20, 20);
    doc.setFontSize(10);
  
    const tableTop = 30;
    const rowHeight = 10;
  
    // Cabeçalhos
    doc.setFillColor(220, 220, 220);
    doc.rect(20, tableTop, 170, rowHeight, 'F');
    doc.text('ID', 22, tableTop + 7);
    doc.text('Data', 35, tableTop + 7);
    doc.text('Localização', 80, tableTop + 7);
    doc.text('Prioridade', 130, tableTop + 7);
    doc.text('Status', 160, tableTop + 7);
  
    // Dados
    relatos.forEach((relato, i) => {
      const y = tableTop + rowHeight * (i + 1);
  
      // Verifica se vai ultrapassar a página
      if (y > 280) {
        doc.addPage();
        doc.setFontSize(10);
      }
  
      doc.text(`${relato.id}`, 22, y + 7);
      doc.text(relato.data, 35, y + 7);
      doc.text(relato.localizacao, 80, y + 7);
      doc.text(relato.prioridade, 130, y + 7);
      doc.text(relato.status, 160, y + 7);
    });
  
    doc.save('relatorio.pdf');
  };  

  // Função para exportar para Excel
  const exportToExcel = () => {
    const dataFormatada = relatos.map(relato => ({
      ID: relato.id,
      Data: relato.data,
      Localização: relato.localizacao,
      Prioridade: relato.prioridade,
      Status: relato.status,
    }));
  
    // Cria a planilha a partir dos dados
    const ws = XLSX.utils.json_to_sheet(dataFormatada);
  
    // Define a largura das colunas
    const columnWidths = [
      { wch: 5 },   // ID
      { wch: 20 },  // Data
      { wch: 30 },  // Localização
      { wch: 12 },  // Prioridade
      { wch: 12 },  // Status
    ];
    ws['!cols'] = columnWidths;
  
    // Aplica o auto-filtro na linha 1 (cabeçalhos)
    const range = XLSX.utils.decode_range(ws['!ref'] || '');
    ws['!autofilter'] = { ref: XLSX.utils.encode_range(range.s, range.e) };
  
    // Cria e salva o arquivo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatos');
    XLSX.writeFile(wb, 'relatorio.xlsx');
  };    

  return (
    <div className="min-h-screen p-6 md:p-10 mt-12">
      <h1 className="text-2xl font-bold mb-8">Relatórios de Relatos Recebidos</h1>

      {/* Botões de Exportação */}
      <div className="mb-6 flex gap-4">
        <button 
          type='button'
          onClick={exportToPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Exportar para PDF
        </button>
        <button
          type='button'
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Exportar para Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatos.map((relato) => (
          <motion.div
            key={relato.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="flex p-4 gap-4 items-center">
              <img
                // src={relato.imagem}
                src='./mine.png'
                alt="Imagem do relato"
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div className="flex flex-col gap-1 text-sm">
                <p><strong>Data:</strong> {relato.data}</p>
                <p><strong>Local:</strong> {relato.localizacao}</p>
                <p>
                  <strong>Prioridade:</strong>{' '}
                  <span className={`px-2 py-1 rounded text-xs ${getPrioridadeCor(relato.prioridade)}`}>
                    {relato.prioridade}
                  </span>
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`px-2 py-1 rounded text-xs ${getStatusCor(relato.status)}`}>
                    {relato.status}
                  </span>
                </p>
                <button
                  type='button'
                  onClick={() => setRelatoSelecionado(relato)}
                  className="mt-2 self-start bg-transparent border border-gray-500 hover:bg-gray-100 text-sm px-3 py-1 rounded transition"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      <AnimatePresence>
        {relatoSelecionado && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-lg w-full relative"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
            >
              <button
                type='button'
                onClick={() => setRelatoSelecionado(null)}
                className="absolute top-2 right-3 text-lg hover:text-gray-600 duration-150"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Detalhes do Relato</h2>
              <img
                // src={relatoSelecionado.imagem}
                src='./mine.png'
                alt="Relato"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p><strong>Data:</strong> {relatoSelecionado.data}</p>
              <p><strong>Localização:</strong> {relatoSelecionado.localizacao}</p>
              <p>
                <strong>Prioridade:</strong>{' '}
                <span className={`px-2 py-1 rounded text-xs ${getPrioridadeCor(relatoSelecionado.prioridade)}`}>
                  {relatoSelecionado.prioridade}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`px-2 py-1 rounded text-xs ${getStatusCor(relatoSelecionado.status)}`}>
                  {relatoSelecionado.status}
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Relatorio;