import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Footer";
import image from '../assets/contactos.jpg'
import { FiPhone } from "react-icons/fi";
import axios from "../lib/axios";
import { MdOutlineEmail } from "react-icons/md";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextArea from "../components/ui/TextArea";
import Toast from "../components/ui/Toast";


export default function Contacts() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [nome,setNome] = useState("")
  const [mensagem,setMensagem] = useState("")
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setEmail(e.target.value);
  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setNome(e.target.value);
  const handleMensagemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMensagem(e.target.value);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email || !nome || !mensagem) {
        alert("Preencha todos os campos corretamente.");
        return;
      }
  
      try {
        const { data, status } = await axios.post("/contacto", {nome, email, mensagem});
        if (status === 200) {
          localStorage.setItem("user", JSON.stringify(data.data))
          setToast({ message: "Mensagem enviada com sucesso", type: "success" })
          setTimeout(() => navigate("/terms"), 2000)
        } else {
          alert(data.error);
        }
      } catch (error) {
        //console.error("Erro ao enviar a mensagem:", error);
        setToast({ message: "Erro ao enviar sua mensagem", type: "error" })
      } 
    };


  return (
    <div className="max-h-screen">
      <Header />

      {/* Container da imagem e título */}
      <div className="relative h-[60vh] w-full">
        <img src={image} className="object-cover w-full h-full" alt="alguemFalandoAoTelemovél" />
        <h1 className="absolute text-white top-1/4 left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl font-bold whitespace-nowrap">Contactos</h1>
      </div>

      {/* Seção de contatos */}
      <div className="flex justify-center gap-8 mt-14 flex-wrap">
        {/* Card do telefone */}
        <div className="flex flex-col justify-center items-center gap-3 p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <FiPhone color="green" size={40} />
          <p className="text-lg">(+244) 934 156 335</p>
        </div>

        {/* Card do email */}
        <div className="flex flex-col justify-center items-center gap-3 p-10 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <MdOutlineEmail color="green" size={40} />
          <p className="text-lg">greenworld70@gmail.com</p>
        </div>
      </div>

      {/* Formulário de contato */}
      <div className="flex items-center justify-center h-auto w-full mt-12 mb-12">
        <div className="max-w-xl mx-auto px-6">
          <div className="max-w-xl mt-6 mb-4">
            <h2 className="text-3xl text-center md:text-3xl font-semibold">Entre em contacto connosco</h2>
            <p className="text-center text-[14px] mt-2 md:text-lg text-gray-600">Envie suas dúvidas para nós</p>
          </div>

          <form action="" id="contact-form" name="contact" className="gap-2 shadow-lg bg-white rounded-lg p-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-full">
                <label htmlFor="fullName" className="block font-medium mb-2 required">Nome completo</label>
                <input type="text" id="fullName" name="nome" onChange={handleNomeChange} required maxLength={255} pattern="[a-zA-ZÀ-ÖØ-öø-ÿÑñáéíóúÁÉÍÓÚüÜ]+([ '-][a-zA-ZÀ-ÖØ-öø-ÿÑñáéíóúÁÉÍÓÚüÜ]+)*" placeholder="Nome completo" className="w-full py-2 px-3 outline-none border-[1px] rounded-[3px]" />
              </div>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="w-full">
                <label htmlFor="email" className="block font-medium mb-2 required">Email</label>
                <input type="email" id="email" name="email" onChange={handleEmailChange} required maxLength={255} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" placeholder="Email" className="w-full py-2 px-3 outline-none border-[1px] rounded-[3px]" />
              </div>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="w-full">
                <label htmlFor="mensagem" className="block font-medium mb-2 required">Mensagem</label>
                <TextArea name="mensagem" id="mensagem" className="w-full py-2 px-3 outline-none border-[1px] rounded-[3px]" onChange={handleMensagemChange} placeholder={"Mensagem"} />
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
              <PrimaryButton  name="Enviar" addClassName="md:w-80 w-[16rem]" />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}