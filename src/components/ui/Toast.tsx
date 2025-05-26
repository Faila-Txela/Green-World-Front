import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostra o toast com atraso mínimo para permitir animação
    setTimeout(() => setVisible(true), 8);

    // Esconde após 5s, remove após 5.5s
    const hideTimer = setTimeout(() => setVisible(false), 5000);
    const removeTimer = setTimeout(onClose, 6000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center gap-3 px-6 py-3 text-white rounded-lg shadow-xl border-l-4 transition-all duration-500
        ${type === "success" ? "bg-green-600 border-green-400" : "bg-red-500 border-red-400"}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      {type === "success" ? <FaCheckCircle size={22} /> : <FaTimesCircle size={22} />}
      <span className="text-lg font-medium">{message}</span>
      <button
        type="button"
        className="ml-4 text-white hover:text-gray-300"
        onClick={() => setVisible(false)}
      >
        ✖
      </button>
    </div>
  );
}
