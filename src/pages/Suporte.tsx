import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import image from '../assets/contactos.jpg';
import { FiSend, FiPhone, FiInstagram, FiFacebook, FiLinkedin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import PrimaryButton from "../components/ui/PrimaryButton";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import Toast from "../components/ui/Toast";
import { suporteService } from "../modules/service/api/suporte";

interface contactoData {
  email: string;
  nome: string;
  mensagem: string;
}

export default function Contacts() {
  const [loading, setLoading] = useState(false)
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
      const { data, status } = await suporteService.create({ ...formData });
      if (status === 201 || data?.success) {
        console.log("Mensagem envida com sucesso.")
        setToast({ message: "Mensagem enviada com sucesso", type: "success" });
      }

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setToast({ message: "Erro ao enviar sua mensagem", type: "error" });
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] w-full">
        <img src={image} className="object-cover w-full h-full" alt="Contactos" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Suporte</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Lado Esquerdo: Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-green-700">Entre em contacto</h2>
              <p className="text-gray-500 mt-2">Estamos aqui para ajudar. Envie sua mensagem!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Nome completo</label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  addClassName="focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  addClassName="focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
                {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Mensagem</label>
                <TextArea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Como podemos ajudar?"
                  className="focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
              </div>

              <PrimaryButton
                type="submit"
                name="Enviar mensagem"
                addClassName="bg-green-700 hover:bg-green-800 text-white py-4"
              >
                <FiSend size={18} className="hover:-translate-y-2 transition duration-300" />
              </PrimaryButton>
            </form>
          </div>

          {/* Lado Direito: Info e Redes */}
          <div className="flex flex-col gap-6">
            
            {/* Grid de Contatos Diretos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-md border-b-4 border-green-600 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <FiPhone className="text-green-700" size={30} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Telefone</h3>
                <a href="tel:+244934156335" className="text-gray-600 hover:text-green-700 transition-colors">
                  (+244) 934 156 335
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-green-600 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <MdOutlineEmail className="text-green-700" size={30} />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                <a href="mailto:greenworld70@gmail.com" className="text-gray-600 hover:text-green-700 transition-colors break-all">
                  greenworld70@gmail.com
                </a>
              </div>
            </div>

            {/* Card de Redes Sociais */}
            <div className="bg-green-700 p-10 rounded-2xl shadow-lg text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Siga-nos nas nossas redes</h3>
              <p className="text-green-100 mb-8 text-sm">Acompanhe nossas novidades e projetos de perto.</p>
              
              <div className="flex justify-center gap-6">
                <a href="#" title="instagram" className="bg-white/10 p-4 rounded-full hover:bg-white hover:text-green-700 transition-all">
                  <FiInstagram size={24} />
                </a>
                <a href="#" title="facebook" className="bg-white/10 p-4 rounded-full hover:bg-white hover:text-green-700 transition-all">
                  <FiFacebook size={24} />
                </a>
                <a href="#" title="linkedln" className="bg-white/10 p-4 rounded-full hover:bg-white hover:text-green-700 transition-all">
                  <FiLinkedin size={24} />
                </a>
              </div>
            </div>

          </div> {/* Fim da coluna direita */}

        </div>
      </div>

      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
