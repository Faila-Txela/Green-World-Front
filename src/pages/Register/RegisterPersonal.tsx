import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaUniversity, FaIdCard, FaEyeSlash, FaEye } from "react-icons/fa";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Logo from "../../assets/Logo";
import { userService } from "../../modules/service/api/user";
import { useQuery } from "@tanstack/react-query";
import { typeUserService } from "../../modules/service/api/typeUser";


const InputField = ({ label, type, name, value, onChange, icon, extraPaddingRight = false }: {
  label: string;
  type: string;
  name: keyof user;
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
        className={`w-full p-3 ${extraPaddingRight ? "pr-10" : "pr-3"} pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent`}
      />
    </div>
  </div>
);

export default function UserForm() {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState<user>({
    nome: "",
    email: "",
    senha: "",
    tipoUser_id: "",
    iban: "",
    nome_titular: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    
    try{
      const typeId = await typeUserService.getTypeIdByDeafault();
      const userData = {...formData, tipoUser_id: typeId}

      const response = await userService.craete(userData);
     if (response.status === 201) {
      navigate("/login")
     }
    } catch (error){
      console.error("Erro ao enviar os dados de cadastro ❌", error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-2xl">
        <div className="text-center mb-6 flex flex-col items-center justify-center gap-2">
        <Logo className="w-20 h-20" />
          <h2 className="text-2xl font-bold text-gray-800">Cadastro do Cidadão</h2>
          <p><b className="text-red-700">*</b>Campos obrigatórios</p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <Link to='/register-personal' className="text-lg font-semibold flex items-center justify-center underline hover:text-green-800">Cidadão Comum</Link>
          <Link to='/register-enterprise' className="text-lg font-semibold flex items-center justify-center hover:text-green-800">Empresa</Link>
         </div>


        <form className="flex flex-col gap-6">
          <InputField label="Nome" type="text" name="nome" value={formData.nome} onChange={handleChange} icon={<FaUser />} />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope />} />

          {/* Campo de senha com ajuste de padding */}
          <div className="relative">
            <InputField 
              label="Senha" 
              type={isShowPassword ? "text" : "password"} 
              name="senha" 
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

          <InputField label="IBAN" type="text" name="iban" value={formData.iban} onChange={handleChange} icon={<FaUniversity />} />
          <InputField label="Nome do Titular" type="text" name="nome_titular" value={formData.nome_titular} onChange={handleChange} icon={<FaIdCard />} />

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-2">
          <span><input type="checkbox" name="" id="" /></span>
          <Link to="/Terms" className="text-[#068a5b] text-sm hover:underline transition duration-500">Concordo com os termos e política de privacidade da Green World</Link>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <PrimaryButton 
            onClick={handleSubmit}
            addClassName="" name="Cadastrar"/>
          </div>

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-3">
          <span>Já tem uma conta?</span>
            <Link to="/Login" className="text-[#068a5b] text-base hover:underline transition duration-500">Entrar</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

