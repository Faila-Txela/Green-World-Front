import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";
import image from '../assets/contactos.jpg';
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextArea from "../components/ui/TextArea";
import Toast from "../components/ui/Toast";
import { contactoService } from "../modules/service/api/contact";

interface contactoData {
  email: string;
  nome: string;
  mensagem: string;
  userId: string;
  empresaId: string;
}

export default function Contacts() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<contactoData>({
    nome: "",
    email: "",
    mensagem: "",
    userId: "",
    empresaId: ""
  });

  const [emailError, setEmailError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Validar email
  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Manipuladores de mudança
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "email") {
      setEmailError(!isEmailValid(value) ? "Email inválido." : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nome, email, mensagem } = formData;

    if (!nome.trim()) {
      setToast({ message: "O seu nome é obrigatório!", type: "error" });
      return;
    }

    if (!email.trim() || !isEmailValid(email)) {
      setToast({ message: "Por favor, insira um e-mail válido!", type: "error" });
      return;
    }

    if (!mensagem.trim()) {
      setToast({ message: "A mensagem é obrigatória!", type: "error" });
      return;
    }

    try {
      const { data, status } = await contactoService.create({ ...formData });
      if (status === 201 || data?.success) {
        setToast({ message: "Mensagem enviada com sucesso", type: "success" });
        localStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => navigate("/terms"), 2000);
      }
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      setToast({ message: "Erro ao enviar sua mensagem", type: "error" });
    }
  };

  return (
    <div className="max-h-screen">
      <Header />

      {/* Imagem e Título */}
      <div className="relative h-[60vh] w-full">
        <img src={image} className="object-cover w-full h-full" alt="alguemFalandoAoTelemovél" />
        <h1 className="absolute text-white top-1/4 left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl font-bold whitespace-nowrap">Contactos</h1>
      </div>

      {/* Cards de contato */}
      <div className="flex justify-center gap-8 mt-14 flex-wrap">
        <div className="flex flex-col justify-center items-center gap-3 p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <FiPhone color="green" size={40} />
          <p className="text-lg">(+244) 934 156 335</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <MdOutlineEmail color="green" size={40} />
          <p className="text-lg">greenworld70@gmail.com</p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex items-center justify-center h-auto w-full mt-12 mb-12">
        <div className="max-w-xl mx-auto px-6">
          <div className="max-w-xl mt-6 mb-4">
            <h2 className="text-3xl text-center font-semibold">Entre em contacto connosco</h2>
            <p className="text-center text-[14px] mt-2 md:text-lg text-gray-600">Envie suas dúvidas para nós</p>
          </div>

          <form id="contact-form" name="contact" className="gap-2 shadow-lg bg-white rounded-lg p-6" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-full">
                <label htmlFor="nome" className="block font-medium mb-2 required">Nome completo</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Nome completo"
                  className="w-full py-2 px-3 outline-none border-[1px] rounded-[3px]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-full">
                <label htmlFor="email" className="block font-medium mb-2 required">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Email"
                  className="w-full py-2 px-3 outline-none border-[1px] rounded-[3px]"
                />
                {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
              </div>
            </div>

            {/* Mensagem */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-full">
                <label htmlFor="mensagem" className="block font-medium mb-2 required">Mensagem</label>
                <TextArea
                  name="mensagem"
                  id="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full py-2 px-3 outline-none border-[1px] rounded-[3px]"
                  placeholder={"Mensagem"}
                />
              </div>
            </div>

            {/* Botão */}
            <div className="flex items-center justify-center mb-8">
              <PrimaryButton name="Enviar" addClassName="md:w-80 w-[16rem]" />
            </div>
          </form>
        </div>
      </div>

      {/* Toast de feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Footer />
    </div>
  );
}