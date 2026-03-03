import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaIdCard, FaEyeSlash, FaEye } from "react-icons/fa";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Logo from "../../assets/Logo";
import { userService } from "../../modules/service/api/user";
import Toast from "../../components/ui/Toast";


const InputField = ({ label, type, name, value, onChange, icon, required = true, placeholder }: {
  label: string;
  type: string;
  name: keyof User;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  required?: boolean;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = name === "senha";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-gray-600 text-sm mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-3 flex items-center text-gray-500">
          {icon}
        </span>
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          title={label}
          className={`w-full p-3 pl-10 ${isPasswordField ? "pr-10" : "pr-3"} border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent`}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-3 flex items-center text-gray-600 hover:text-gray-800"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

interface User {
  nome: string;
  email: string;
  senha: string;
  tipoUser_id?: string;
  iban: string;
  nome_titular: string;
}

export default function UserForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState<User>({
    nome: "",
    email: "",
    senha: "",
    tipoUser_id: "",
    iban: "",
    nome_titular: "",
  });

  const formatIban = (input: string) => {
    let cleaned = input.replace(/[^0-9]/g, "").slice(0, 23);
    let formatted = "AO.";
    const partes = [4, 4, 4, 4, 4, 3];

    let start = 0;
    for (const tamanho of partes) {
      const chunk = cleaned.slice(start, start + tamanho);
      if (chunk) {
        formatted += chunk + ".";
        start += tamanho;
      }
    }

    if (start < cleaned.length) {
      formatted += cleaned.slice(start);
    } else {
      formatted = formatted.slice(0, -1);
    }

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: name === "iban" ? formatIban(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const nomeValido = formData.nome.trim();
    if (!nomeValido) {
      setToast({ message: "O nome é obrigatório!", type: "error" });
      setLoading(false);
      return;
    }

    if (!/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/.test(nomeValido)) {
      setToast({ message: "O nome deve conter apenas letras e não pode ter espaços em excesso!", type: "error" });
      setLoading(false);
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setToast({ message: "Por favor, insira um e-mail válido!", type: "error" });
      setLoading(false);
      return;
    }

    if (!formData.senha.trim() || formData.senha.length < 6) {
      setToast({ message: "A senha deve ter pelo menos 6 caracteres!", type: "error" });
      setLoading(false);
      return;
    }

    if (formData.iban.trim()) {
      const ibanRegex = /^AO(\.\d{4}){5}\.\d{3}$/;
      if (!ibanRegex.test(formData.iban.trim())) {
        setToast({ message: "O IBAN deve seguir o formato: AO06.0055.0000.3541.9521.1012.4", type: "error" });
        setLoading(false);
        return;
      }
    }

    const nomeTitularValido = formData.nome_titular.trim();
    if (!nomeTitularValido) {
      setToast({ message: "O nome do titular é obrigatório!", type: "error" });
      setLoading(false);
      return;
    }

    if (!/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/.test(nomeTitularValido)) {
      setToast({ message: "O nome do titular deve conter apenas letras e espaços válidos!", type: "error" });
      setLoading(false);
      return;
    }

    if (!(document.getElementById("terms") as HTMLInputElement)?.checked) {
      setToast({ message: "Você deve concordar com os termos e política de privacidade!", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const userData = {
        ...formData,
        iban: formData.iban.trim() === "" ? "" : formData.iban.trim()
      };

      const response = await userService.create(userData);
      if (response.status === 201) {
        setToast({ message: "Cadastro feito com sucesso!", type: "success" });
        setTimeout(() => navigate("/personal-login"), 2000);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados de cadastro:", error);
      setToast({ message: "Erro ao enviar os dados de cadastro", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="w-full max-w-4xl p-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl border border-gray-50">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 text-green-700">
            <Logo className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Cadastro do Cidadão</h2>
          <p className="text-gray-500 mt-2">Faça parte da nossa comunidade sustentável</p>
        </div>

        <div className="flex border-b mb-8">
          <div className="flex-1 text-center py-3 text-green-700 font-bold border-b-4 border-green-600">
            Cidadão
          </div>
          <Link to='/register-enterprise' className="flex-1 text-center py-3 text-gray-400 font-medium hover:text-green-600 transition-colors">
            Empresa
          </Link>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              placeholder="Digite seu nome"
              label="Nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              icon={<FaUser />}
            />

            <InputField 
              placeholder="Digite seu email"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={<FaEnvelope />}
            />

            <InputField 
              placeholder="Digite sua senha"
              label="Senha"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              icon={<FaLock />}
            />

            <InputField 
              placeholder="Digite seu IBAN"
              label="IBAN"
              type="text"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              icon={<FaUniversity />}
            />

            <div className="md:col-span-2">
              <InputField 
                placeholder="Digite seu titular"
                label="Nome do Titular"
                type="text"
                name="nome_titular"
                value={formData.nome_titular}
                onChange={handleChange}
                icon={<FaIdCard />}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="terms" id="terms" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Concordo com os <Link to="/terms" className="text-green-700 font-semibold hover:underline">termos e políticas</Link> da Green World.
              </label>
            </div>

            <PrimaryButton 
              addClassName="bg-primary font-semibold text-white mt-6 w-full" 
              name={loading ? "Processando..." : "Criar Conta"} 
            />

            <div className="text-center text-gray-600 text-sm">
              Já tem uma conta? <Link to="/personal-login" className="text-primary hover:underline transition duration-500 text-sm">Entrar agora</Link>
            </div>
          </div>
        </form>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}