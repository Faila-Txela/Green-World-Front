import React, { useState } from "react";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";
import image from '../assets/contactos.jpg';
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import contactImage from "../assets/Contact us-pana.png";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextArea from "../components/ui/TextArea";
import Toast from "../components/ui/Toast";
import { contactoService } from "../modules/service/api/contact";

interface contactoData {
  email: string;
  nome: string;
  mensagem: string;
}

export default function Contacts() {
  const [formData, setFormData] = useState<contactoData>({
    nome: "",
    email: "",
    mensagem: ""
  });

  const [emailError, setEmailError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

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
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setToast({ message: "Erro ao enviar sua mensagem", type: "error" });
    }
  };

  return (
    <div className="max-h-screen">
      <Header />

      {/* Imagem e Título */}
      <div className="relative h-[60vh] w-full">
        <img src={image} className="object-cover w-full h-full" alt="alguemFalandoAoTelemovél" />
        <h1 className="absolute text-white top-1/4 left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl font-bold whitespace-nowrap">
          Contactos
        </h1>
      </div>

      {/* Cards de contato */}
      <div className="flex justify-center gap-8 mt-14 flex-wrap">
        <div className="flex flex-col justify-center items-center gap-3 p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <FiPhone color="green" size={40} />
          <a href="https://wa.link/pgmlf7" target="_blank" rel="noopener noreferrer" className="text-lg">
            (+244) 934 156 335
          </a>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <MdOutlineEmail color="green" size={40} />
          <a href="mailto:albertinasauimbo17@gmail.com" className="text-lg">
            greenworld70@gmail.com
          </a>
        </div>
      </div>

      {/* Formulário e Imagem */}
      <div className="flex justify-center items-center mt-12 mb-12 px-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Imagem (só em telas md ou maiores) */}
          <div className="hidden md:flex md:w-1/2 justify-center">
            <img src={contactImage} alt="mulherAoTelemóvel" className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition duration-200" />
          </div>

          {/* Formulário */}
          <form
            id="contact-form"
            name="contact"
            className="w-full md:w-1/2 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 p-6"
            onSubmit={handleSubmit}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-green-700">Entre em contacto connosco</h2>
              <p className="text-[14px] mt-2 md:text-lg text-gray-600">Envie suas dúvidas para nós</p>
            </div>

            {/* Nome */}
            <div className="mb-4">
              <label htmlFor="nome" className="block font-medium mb-2 text-gray-700">Nome completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                maxLength={100}
                placeholder="Nome completo"
                className="w-full py-2 px-3 outline-none border border-gray-300 focus:border-green-600 rounded"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2 text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
                placeholder="Email"
                className="w-full py-2 px-3 outline-none border border-gray-300 focus:border-green-600 rounded"
              />
              {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
            </div>

            {/* Mensagem */}
            <div className="mb-4">
              <label htmlFor="mensagem" className="block font-medium mb-2 text-gray-700">Mensagem</label>
              <TextArea
                name="mensagem"
                id="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                className="w-full py-2 px-3 outline-none border focus:outline-none focus:border-green-600 border-gray-300 rounded"
                placeholder="Mensagem"
              />
            </div>

            {/* Botão */}
            <div className="flex justify-center mt-6">
              <PrimaryButton name="Enviar" addClassName="w-full md:w-60" />
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
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
