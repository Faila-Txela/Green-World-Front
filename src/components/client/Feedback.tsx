import { useState, useEffect } from "react";
import { VscFeedback } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import Toast from '../ui/Toast';
import { feedbackService } from "../../modules/service/api/feedback";
import PrimaryButton from "../../components/ui/PrimaryButton";

function Feedback() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; } | null>(null);
  const [feedbacks, setFeedbacks] = useState([
    { nome: "Maria", texto: "Seria bom ter uma opção para ver os relatos por prioridade.", data: "14/04/2025" },
    { nome: "João", texto: "A interface está ótima, mas poderiam adicionar um modo escuro.", data: "13/04/2025" },
    { nome: "Carla", texto: "Excelente ideia essa plataforma. Espero que ajude mesmo!", data: "12/04/2025" },
  ]);

  const [novoFeedback, setNovoFeedback] = useState("");

  const adicionarFeedback = async () => {
    if (novoFeedback.trim() === "") return;
  
    const userId = localStorage.getItem("userId");
    const empresaId = localStorage.getItem("empresaId");
  
    if (!userId && !empresaId) {
      console.log("Nenhuma identificação encontrada.");
      setToast({ message: "Usuário ou empresa não identificados.", type: "error" });
      return;
    }

    if (novoFeedback.trim().length < 32) {
    setToast({ message: "Seu feedback deve ter pelo menos 32 caracteres.", type: "error" });
    return;
    }
  
    console.log("Novo feedback:", novoFeedback);
    console.log("User ID:", userId);
    console.log("Empresa ID:", empresaId);

    const payload = {
      feedback: novoFeedback,
      ...(userId ? { userId } : empresaId ? { empresaId } : {}),
    };
  
    console.log("Enviando Feedback", payload);
  
    try {
      const response = await feedbackService.create(payload);
  
      const novo = {
        nome: "Você",
        texto: novoFeedback,
        data: new Date(response.createAt).toLocaleDateString("pt-BR"),
      };
  
      setFeedbacks([novo, ...feedbacks]);
      setNovoFeedback("");
      setToast({ message: "Feedback enviado com sucesso!", type: "success" });
  
    } catch (err) {
      //console.error("Erro ao enviar feedback:", err);
      if (err instanceof Error) {
        console.error("Erro ao enviar feedback:", (err as any).response?.data || err.message);
      } else {
        console.error("Erro ao enviar feedback:", err);
      }
      setToast({ message: "Erro ao enviar feedback.", type: "error" });
    }
  };  
  
useEffect(() => {
  const fetchFeedbacks = async () => {
    try {
      const { data } = await feedbackService.getAll();
      const formatted = data.map((f: any) => ({
        nome: f.user ? f.user.nome : (f.empresa ? f.empresa?.nome : "Usuário"),
        texto: f.feedback,
        data: new Date(f.createAt).toLocaleDateString("pt-BR"),
      }));
      setFeedbacks(formatted);
    } catch (err) {
      console.error("Erro ao buscar feedbacks:", err);
    }
  };

  fetchFeedbacks();
}, []);

  
  return (
    <div className="flex flex-col h-screen px-8 py-20">
      {/* Título da página */}
      <div className="flex items-center gap-3 mb-8">
        <VscFeedback className="h-9 w-9 text-green-600 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">Painel de Feedbacks</h1>
      </div>

      {/* Campo de envio */}
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 p-6 mb-8 w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">Deixe seu feedback</h2>
        <textarea
          className="w-full h-24 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          placeholder="Digite aqui sua sugestão, crítica ou comentário..."
          value={novoFeedback}
          required
          onChange={(e) => setNovoFeedback(e.target.value)}
        />
        <div className="mt-3">
          <PrimaryButton name="Enviar Feedback" addClassName="" onClick={adicionarFeedback} />
        </div>
      </div>

      {/* Lista de feedbacks */}
      <div className="flex flex-col gap-4 w-full max-w-3xl overflow-y-auto">
        {feedbacks.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <FaUserCircle className="text-green-600 text-2xl" />
              <span className="font-semibold text-gray-700">{item.nome}</span>
              <span className="text-sm text-gray-400 ml-auto">{item.data}</span>
            </div>
            <p className="text-gray-600">{item.texto}</p>
          </div>
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
  );
}

export default Feedback;