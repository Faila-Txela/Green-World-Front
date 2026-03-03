import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Header from "../../components/layout/Header";
import Input from "../../components/ui/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import background from "../../assets/enterprise.png";
import Toast from "../../components/ui/Toast";
import axios from "../../lib/axios";
import { useAuth } from "../../routes/auth_context";

export default function EnterpriseLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Função para validação de email
  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Validação do campo do email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!isEmailValid(value)) {
      setEmailError("Email inválido.");
    } else {
      setEmailError("");
    }
  };

  // Validação do campo da senha
  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSenha(value);
    if (value.length < 6) {
      setSenhaError("A senha deve conter no mínimo 6 caracteres.");
    } else {
      setSenhaError("");
    }
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Função para Entrar na dashboard
  const Enter = async () => {
    if (!email || !senha) {
      setToast({ message: "Preencha todos os dados.", type: "error" });
      return;
    }

    if (!isEmailValid(email)) {
      setToast({ message: "Email inválido", type: "error" });
      return;
    }

    if (senha.length < 6) {
      setToast({
        message: "A senha deve conter no mínimo 6 caracteres.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const { data, status } = await axios.post("/empresas/login", {
        email,
        senha,
      });

      if (status === 200) {
        setToast({ message: "Login da empresa, feito com sucesso", type: "success" });
        setUser(data.data);
        
        localStorage.setItem("empresa", JSON.stringify(data.data));
      
        const empresaId = data?.data?.id;
        if (empresaId) {
          localStorage.setItem("empresaId", empresaId);
        } else {
          console.warn("ID da empresa não encontrado no login.");
        }
      
        setTimeout(() => navigate("/enterprise-dashboard"), 2000);
      }
       else {
        setToast({ message: "Erro ao fazer login.", type: "error" });
      }
    } catch (error: any) {
      setToast({
        message: "Erro no servidor ao tentar fazer login.",
        type: "error",
      });

      if (error.response) {
        const errorStatus = error.response.status;
        if (errorStatus === 401) {
          setToast({
            message: "Credenciais inválidas. Tente novamente.",
            type: "error",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-20">

        <form
          onClick={(e) => e.preventDefault()}
          className={`flex items-center flex-col justify-center w-full max-w-[30rem] min-w-[18rem] h-auto gap-6 p-6 bg-white shadow-md rounded-lg transition-all duration-1000 ease-in-out ${animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <h3 
          className="text-2xl font-semibold text-primary">
            Login da Empresa
          </h3>

          <div className="flex flex-col w-full gap-3">
            <label htmlFor="email" className="p-1 text-gray-600 text-sm">
              Seu e-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="on"
              value={email}
              onChange={handleEmailChange}
              addClassName="w-full border-2 focus:border-green-400 p-2 rounded-md"
            />
            {emailError && (
              <span className="text-red-500 text-sm">{emailError}</span>
            )}

            <label htmlFor="senha" className="p-1 text-gray-600 text-sm">
              Sua senha
            </label>
            <div className="relative w-full">
              <Input
                id="senha"
                type={isShowPassword ? "text" : "password"}
                placeholder="Senha"
                autoComplete="on"
                value={senha}
                onChange={handleSenhaChange}
                addClassName="w-full border-2 focus:border-green-400 rounded-md"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

              {senhaError && ( <span className="text-red-500 text-sm">{senhaError}</span>)}
          </div>

          <div className="w-full flex justify-end">
            <a
              className="text-primary text-sm hover:underline transition duration-500"
              href="#"
            >
              Esqueci minha senha
            </a>
          </div>

          <div className="w-full">
            <PrimaryButton
              addClassName={`font-semibold text-white bg-primary ${loading ? "opacity-60 cursor-not-allowed" : ""}`} 
              name={loading ? "Carregando..." : "Entrar"}
              onClick={Enter}
              disabled={loading} 
            />
          </div>

          <div className="w-full">
            <PrimaryButton
              addClassName="font-semibold text-white bg-primary"
              name="Cadastrar-se"
              onClick={(e: any) => {
                e.preventDefault();
                navigate("/register-enterprise");
              }}
            />
          </div>
        </form>

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
