import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center gap-3 px-6 py-4  rounded-lg shadow-xl transition-transform tarnsfrom animate-slide-in 
        ${type === "success" ? "bg-green-600 border-l-4 border-green-400" : "bg-red-600 border-l-4 border-red-400"}
        animate-slide-in`}
    >
      {type === "success" ? <FaCheckCircle size={24} /> : <FaTimesCircle size={24} />}
      <span className="text-lg font-medium">{message}</span>
      <button className="ml-4 text-white hover:text-gray-300" onClick={onClose}>✖</button>
    </div>
  );
}

