import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaIdCard, FaEyeSlash, FaEye } from "react-icons/fa";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Logo from "../../assets/Logo";
import { userService } from "../../modules/service/api/user";
import Toast from "../../components/ui/Toast";
import { typeUserService } from "../../modules/service/api/typeUser";


const InputField = ({ label, type, name, value, onChange, autoComplete, icon, extraPaddingRight = false }: {
  label: string;
  type: string;
  name: keyof user;
  autoComplete?: string;
  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  extraPaddingRight?: boolean; 
}) => (
  <div className="relative">
    <label htmlFor={name} className="block text-gray-600 font-semibold mb-2">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={`Enter your ${label.toLowerCase()}`}
        title={label}
        className={`w-full p-3 ${extraPaddingRight ? "pr-10" : "pr-3"} pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent`}
      />
    </div>
  </div>
);

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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [formData, setFormData] = useState<User>({
    nome: "",
    email: "",
    senha: "",
    tipoUser_id: "",
    iban: "",
    nome_titular: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Dados enviados:", formData);
    setToast({ message: "Cadastro feito com sucesso!", type: "success" })

    // Validações
  if (!formData.nome.trim()) {
    setToast({ message: "O nome da empresa é obrigatório!", type: "error" });
    return;
  }

  if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    setToast({ message: "Por favor, insira um e-mail válido!", type: "error" });
    return;
  }

  if (!formData.senha.trim() || formData.senha.length < 6) {
    setToast({ message: "A senha deve ter pelo menos 6 caracteres!", type: "error" });
    return;
  }

  if (!formData.iban.trim()) {
    setToast({ message: "O IBAN é obrigatório", type: "error" });
    return;
  }

  if (!formData.nome_titular.trim()) {
    setToast({ message: "O nome de titular é obrigatório", type: "error" });
    return;
  }

  if (!(document.getElementById("terms") as HTMLInputElement)?.checked) {
    setToast({ message: "Você deve concordar com os termos e política de privacidade!", type: "error" });
    return;
  }
    
    try{
      const typeId = await typeUserService.getTypeIdByDeafault();
      const userData = {...formData, tipoUser_id: typeId}

    const response = await userService.create(userData);
      if (response.status === 201) {
       setTimeout(() => navigate("/personal-login"), 2000)
      }

    } catch (error){
      //console.error("Erro ao enviar os dados de cadastro ❌", error)
      setToast({ message: "❌ Erro ao enviar os dados de cadastro", type: "error" })
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-2xl">
        <div className="text-center mb-6 flex flex-col items-center justify-center gap-2">
        <Logo className="w-20 h-20" />
          <h2 className="text-2xl font-bold text-gray-800">Cadastro do Cidadão</h2>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <Link to='/register-personal' className="text-lg font-semibold flex items-center justify-center underline hover:text-green-800">Cidadão Comum</Link>
          <Link to='/register-enterprise' className="text-lg font-semibold flex items-center justify-center hover:text-green-800">Empresa</Link>
         </div>


        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <InputField label="Nome" autoComplete="on" type="text" name="nome" value={formData.nome} onChange={handleChange} icon={<FaUser />} />
          <InputField label="Email" type="email" autoComplete="on" name="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope />} />

          {/* Campo de senha com ajuste de padding */}
          <div className="relative">
            <InputField 
              label="Senha" 
              type={isShowPassword ? "text" : "password"} 
              name="senha" 
              autoComplete="on"
              value={formData.senha} 
              onChange={handleChange} 
              icon={<FaLock />} 
              extraPaddingRight 
            />
          <button
            type="button"
            className="absolute inset-y-7 top-14 right-3 flex items-center text-gray-600 hover:text-gray-800"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
          </div>

          <InputField label="IBAN" type="text" name="iban" autoComplete="on" value={formData.iban} onChange={handleChange} icon={<FaUniversity />} />
          <InputField label="Nome do Titular" type="text" name="nome_titular" autoComplete="on" value={formData.nome_titular} onChange={handleChange} icon={<FaIdCard />} />

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-2">
          <span>
            <input type="checkbox" name="terms" id="terms" title="Agree to terms and privacy policy" />
            
          </span>
          <Link to="/Terms" className="text-[#068a5b] text-sm hover:underline transition duration-500">Concordo com os termos e política de privacidade da Green World</Link>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <PrimaryButton 
            addClassName="" name="Cadastrar"/>
          </div>

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-3">
          <span>Já tem uma conta?</span>
            <Link to="/personal-login" className="text-[#068a5b] text-base hover:underline transition duration-500">Entrar</Link>
          </div>

        </form>
           {/* Exibe o Toast se houver mensagem */}
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}

