import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TbReport } from "react-icons/tb";
import { FaDownload } from "react-icons/fa6";
import { relatorioColetaService } from '../modules/service/api/relatorioColeta';
import axios from '../lib/axios';
import Toast from './ui/Toast';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface Relato {
  id: string;
  imagem?: string;
  data: string;
  localizacao: string;
  prioridade: 'ALTA' | 'BAIXA';
  statusColeta: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO';
  userId?: string;
}

const Relatorio = () => {
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [relatosFiltrados, setRelatosFiltrados] = useState<Relato[]>([]);
  const [statusTemp, setStatusTemp] = useState<Record<string, Relato['statusColeta']>>({});
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [prioridadeFilter, setPrioridadeFilter] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [relatoSelecionado, setRelatoSelecionado] = useState<Relato | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Efeito para buscar relatos ao carregar o componente
  useEffect(() => {
    const buscarRelatos = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/relatar', {
          params: {
            include: 'relatorioColeta'
          }
        });
        
        // Tipagem para os dados da API
        interface ApiRelato {
          id: string;
          imagemUrl?: string;
          createAt: string;
          bairro: string;
          municipio: { nome: string };
          prioridade: 'ALTA' | 'BAIXA';
          relatorioColeta?: { statusColeta?: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO' };
        }

        // Formata os dados com fallback para PENDENTE
        const relatosFormatados: Relato[] = res.data.map((relato: ApiRelato) => ({
          id: relato.id,
          imagem: relato.imagemUrl,
          data: relato.createAt,
          localizacao: `${relato.bairro}, ${relato.municipio?.nome || 'Luanda'}`,
          prioridade: relato.prioridade,
          statusColeta: relato.relatorioColeta?.statusColeta || 'PENDENTE' // Fallback seguro
        }));

        setRelatos(relatosFormatados);
        setRelatosFiltrados(relatosFormatados);
      } catch (error) {
        console.error("Erro ao buscar relatos:", error);
        setToast({ message: "Erro ao carregar relatos", type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    
    buscarRelatos();
  }, []);

  // Filtragem dos relatos
  useEffect(() => {
    const filtrados = relatos.filter((r) => {
      const passaStatus = !statusFilter || r.statusColeta === statusFilter;
      const passaPrioridade = !prioridadeFilter || 
        (prioridadeFilter.toUpperCase().includes('ALTA') && r.prioridade.includes('ALTA')) || 
        (prioridadeFilter.toUpperCase().includes('BAIXA') && r.prioridade.includes('BAIXA'));
      
      return passaStatus && passaPrioridade;
    });
    setRelatosFiltrados(filtrados);
  }, [statusFilter, prioridadeFilter, relatos]);

  // Atualização de status
  // const handleStatusChange = async (relatoId: string) => {
  //   const novoStatus = statusTemp[relatoId];
  //   if (!novoStatus) return;

  //   try {
  //     setLoading(true);
  //     // const response = await axios.put(`/relatorio-coleta/:${relatoId}/status`, { 
  //     //   statusColeta: novoStatus 
  //     // });

  //     const response = await relatorioColetaService.updateStatus(relatoId, novoStatus);

  //     if (response.data.success) {
  //       setRelatos(prev => prev.map(r => 
  //         r.id === relatoId ? { ...r, statusColeta: novoStatus } : r
  //       ));
  //       setToast({
  //         message: "Status atualizado com sucesso!",
  //         type: 'success'
  //       });
  //     } else {
  //       throw new Error(response.data.error || "Erro ao atualizar status");
  //     }
  //   } catch (error: any) {
  //     console.error("Erro ao atualizar status:", error);
  //     setToast({
  //       message: error.response?.data?.error || "Erro ao atualizar status",
  //       type: 'error'
  //     });
  //   } finally {
  //     setLoading(false);
  //     setRelatoSelecionado(null);
  //   }
  // };

    const handleStatusChange = async (relatoId: string) => {
  const novoStatus = statusTemp[relatoId];
  if (!novoStatus) return;

  try {
    setLoading(true);
    const response = await axios.patch(`/relatorio/:${relatoId}/status`, { 
      status: novoStatus 
    });
    console.log("RESPOSTA", response)

    if (response.data.success) {
      setRelatos(prev => prev.map(r => 
        r.id === relatoId ? { ...r, statusColeta: novoStatus } : r
      ));
      setToast({
        message: "Status atualizado com sucesso! O usuário foi notificado.",
        type: 'success'
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    setToast({ message: 'Erro ao actualizar status', type:'error' })
  } finally {
    setLoading(false);
    setRelatoSelecionado(null);
  }
};

  // Funções auxiliares para formatação
  const formatarPrioridade = (prioridade: string) => {
    return prioridade.includes('ALTA') ? '🔴 Alta Prioridade' : '🔵 Baixa Prioridade';
  };

  const getCorPrioridade = (prioridade: string) => {
    return prioridade.includes('ALTA') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';
  };

  const formatarStatus = (status?: string) => {
    const statusValidado = status || 'PENDENTE';
    switch (statusValidado) {
      case 'PENDENTE': return '⌛ PENDENTE';
      case 'NAO_RETIRADO': return '❌ NAO_RETIRADO';
      case 'RETIRADO': return '✅ RETIRADO';
      default: return '⌛ PENDENTE';
    }
  };

  const getCorStatus = (status?: string) => {
    const statusValidado = status || 'PENDENTE';
    switch (statusValidado) {
      case 'PENDENTE': return 'bg-yellow-100 text-yellow-700';
      case 'NAO_RETIRADO': return 'bg-red-100 text-red-700';
      case 'RETIRADO': return 'bg-green-100 text-green-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

   // Funções para exportar os dados
  // const exportToPDF = () => {
  //   alert('Exportando para PDF.');
  //   const doc = new jsPDF();
  //   doc.text('Relatório de Relatos Recebidos', 20, 20);
  //   const rowHeight = 10;
  //   doc.setFillColor(220, 220, 220);
  //   doc.rect(20, 30, 170, rowHeight, 'F');
  //   doc.text('ID', 22, 37);
  //   doc.text('Data', 35, 37);
  //   doc.text('Localização', 80, 37);
  //   doc.text('Prioridade', 130, 37);
  //   doc.text('Status', 160, 37);
    
  //   relatosFiltrados.forEach((r, i) => {
  //   const y = 40 + i * rowHeight;
  //   if (y > 280) doc.addPage();

  //   doc.text(String(r.id), 22, y);
  //   doc.text(new Date(r.data).toLocaleDateString(), 35, y);
  //   doc.text(String(r.localizacao), 80, y);
  //   doc.text(formatarPrioridade(r.prioridade), 130, y);
  //   doc.text(formatarStatus(r.statusColeta), 160, y);
  //   });

  //   doc.save('relatorio.pdf');
  // };


const exportToPDF = () => {
  try {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const rowHeight = 10;
    let y = 20;

    doc.setFontSize(16);
    doc.text('Relatório de Relatos Recebidos', pageWidth / 2, y, { align: 'center' });
    y += 12;

    doc.setFontSize(12);
    doc.setFillColor(220, 220, 220);
    doc.rect(margin, y, pageWidth - 2 * margin, rowHeight, 'F');

    const headers = ['ID', 'Data', 'Localização', 'Prioridade', 'Status'];
    const colWidths = [30, 25, 60, 30, 30]; // Total ~175 com margem
    let x = margin;

    headers.forEach((header, index) => {
      doc.text(header, x + 1, y + 7);
      x += colWidths[index];
    });

    y += rowHeight;
    doc.setFontSize(10);

    relatosFiltrados.forEach((r) => {
      if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        y = 20;
      }

      const id = doc.splitTextToSize(r.id, colWidths[0] - 2);
      const data = [new Date(r.data).toLocaleDateString()];
      const local = doc.splitTextToSize(r.localizacao, colWidths[2] - 2);
      const prioridade = [r.prioridade === 'ALTA' ? 'Alta' : 'Baixa'];
      const status = [formatarStatus(r.statusColeta)];

      const linhas = Math.max(id.length, data.length, local.length, prioridade.length, status.length);
      const alturaTotal = linhas * 6;

      let linhaY = y;
      for (let i = 0; i < linhas; i++) {
        let xi = margin;

        doc.text(id[i] || '', xi + 1, linhaY);
        xi += colWidths[0];

        doc.text(data[i] || '', xi + 1, linhaY);
        xi += colWidths[1];

        doc.text(local[i] || '', xi + 1, linhaY);
        xi += colWidths[2];

        doc.text(prioridade[i] || '', xi + 1, linhaY);
        xi += colWidths[3];

        doc.text(status[i] || '', xi + 1, linhaY);
        linhaY += 6;
      }

      y += alturaTotal + 2;
    });

    doc.save(`Relatorio_Green_World_${new Date().toISOString().slice(0, 10)}.pdf`);
    setToast({ message: "Relatório exportado com sucesso!", type: 'success' });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    setToast({
      message: "Erro ao exportar para PDF. Verifique os dados e tente novamente.",
      type: 'error'
    });
  }
};



  const exportToExcel = () => {
    const dados = relatosFiltrados.map(r => ({
      ID: r.id,
      Data: new Date(r.data).toLocaleDateString(),
      Localização: r.localizacao,
      Prioridade: r.prioridade,
      Status: r.statusColeta,
    }));
    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório Green World');
    XLSX.writeFile(wb, 'Relatorio_Green_World.xlsx');
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 mt-8 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

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
          className="border p-2 rounded cursor-pointer"
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
          className="border p-2 rounded cursor-pointer"
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
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        
        >
          <FaDownload />
          Exportar PDF
        </button>

        <button 
          type='button'
          onClick={exportToExcel} 
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
          disabled={relatosFiltrados.length === 0}
        >
          <FaDownload />
          Exportar Excel
        </button>
      </div>

      {relatosFiltrados.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Nenhum relato encontrado com os filtros selecionados.</p>
        </div>
      ) : (
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
                <img 
                  src={relato.imagem || './mine.png'} 
                  alt={`Imagem do relato ${relato.id}`} 
                  className="w-24 h-24 object-cover rounded-md border"  
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = './mine.png';
                  }}
                />
                <div className="text-sm space-y-1">
                  <p><strong>Data:</strong> {new Date(relato.data).toLocaleDateString()}</p>
                  <p><strong>Local:</strong> {relato.localizacao}</p>
                  <p><strong>ID:</strong> {relato.id}</p>
                  <p>
                    <strong>Prioridade:</strong>{' '}
                    <span className={`px-2 py-1 rounded-full font-semibold animate-pulse text-xs ${getCorPrioridade(relato.prioridade)}`}>
                      {formatarPrioridade(relato.prioridade)}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`px-2 py-1 rounded-full font-semibold animate-pulse text-xs ${getCorStatus(relato.statusColeta)}`}>
                      {formatarStatus(relato.statusColeta)}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = './mine.png';
              }}
            />

            <div className="space-y-2 text-sm text-zinc-700">
              <p><strong>📅 Data:</strong> {new Date(relatoSelecionado.data).toLocaleDateString()}</p>
              <p><strong>📍 Localização:</strong> {relatoSelecionado.localizacao}</p>
              <p><strong>🔑 Id:</strong> {relatoSelecionado.id}</p>
              <p>
                <strong>🚨 Prioridade:</strong>{' '}
                <span className={`px-2 py-1 rounded-full animate-pulse font-semibold text-xs ${getCorPrioridade(relatoSelecionado.prioridade)}`}>
                  {formatarPrioridade(relatoSelecionado.prioridade)}
                </span>
              </p>
              <p>
                <strong>📌 Status Atual:</strong>{' '}
                <span className={`px-2 py-1 animate-pulse rounded-full font-semibold text-xs ${getCorStatus(relatoSelecionado.statusColeta)}`}>
                  {formatarStatus(relatoSelecionado.statusColeta)}
                </span>
              </p>
            </div>

            <div className="mt-5">
              <label htmlFor="status-select" className="text-sm font-medium mb-1 block">
                Alterar status:
              </label>
              <select
                id="status-select"
                value={statusTemp[relatoSelecionado.id] || relatoSelecionado.statusColeta}
                onChange={(e) =>
                  setStatusTemp({
                    ...statusTemp,
                    [relatoSelecionado.id]: e.target.value as Relato['statusColeta'],
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
                className="px-4 py-2 rounded-md bg-zinc-200 hover:bg-zinc-300 text-zinc-800 transition"
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
  )

};

export default Relatorio;

// Markup message bug fixed🐛✅