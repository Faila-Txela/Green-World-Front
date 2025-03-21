import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaPhone, FaCity } from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";
//import CustomSelector from "../../components/custom/selector";
import Logo from "../../assets/Logo";
import { useQuery } from "@tanstack/react-query";
import { provinciaService } from "../../modules/service/api/provincia";

interface UserFormData {
  nome: string;
  email: string;
  senha: string;
  tipo_empresa: string;
  bairro: string;
  municipio: string;  
  phone: string;
  nif: string;
}

const InputField = ({ label, type, name, value, onChange, icon, extraPaddingRight = false }: {
  label: string;
  type: string;
  name: keyof UserFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  extraPaddingRight?: boolean; 
}) => (
  <div className="relative w-full">
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
  const [formData, setFormData] = useState<UserFormData>({
    nome: "",
    email: "",
    senha: "",
    nif: "",
    tipo_empresa: "",
    phone: "",
    bairro: "",
    municipio: ""
  });

  // const { data: provincias, error: provinciaError } = useQuery({
  //   queryKey: ["provincias"],
  //   queryFn: () => provinciaService.getAll()
  // });

  // if (provinciaError) {
  //   console.error("Erro ao buscar as provincias", provinciaError)
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Dados enviados:", formData);
      const telefone = formData.phone;
      const bairro = formData.bairro;
      
      try{
        //const endereco = await addressService.create(formData);
        //const response = await empresaService.create();
        // if (response.status === 201) {
        //   navigate("/login");
        // }
      } catch (error){
        console.error("Erro ao enviar os dados de cadastro ❌", error)
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-2xl">
        <div className="text-center mb-6 flex flex-col items-center justify-center gap-4">
        <Logo className="w-20 h-20"/>
          <h2 className="text-2xl font-bold text-gray-800">Cadastro da Empresa</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <Link to='/register-personal' className="text-lg font-semibold flex items-center justify-center hover:text-green-800">Cidadão Comum</Link>
          <Link to='/register-enterprise' className="text-lg font-semibold flex items-center justify-center underline hover:text-green-800">Empresa</Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField label="Nome da Empresa" type="text" name="nome" value={formData.nome} onChange={handleChange} icon={<FaUser />} />
          <InputField label="Email da Empresa" type="email" name="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope />} />
          
          <div className="relative w-full  ">
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

          <InputField label="NIF" type="text" name="nif" value={formData.nif} onChange={handleChange} icon={<HiMiniIdentification />} />

          <InputField label="Telefone da Empresa" type="phone" name="phone" value={formData.phone} onChange={handleChange} icon={<FaPhone />} />

          <InputField label="Bairro" type="text" name="bairro" value={formData.bairro} onChange={handleChange} icon={<FaCity />} />

          <InputField label="Município" type="text" name="municipio" value={formData.municipio} onChange={handleChange} icon={<FaCity />} />

          <select name="" id="">
            <option value="">Luanda</option>
            <option value="">Moxico</option>
            <option value="">Benguela</option>
            <option value="">Cuanza</option>
            <option value="">Norte</option>
            <option value="">Sul</option>
          </select>

          <select name="" id="">
            <option value="">Aterros sanitários</option>
            <option value="">Catadores</option>
            <option value="">Recicladores</option>
          </select>

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-2">
            <span><input type="checkbox" name="" id="" /></span>
            <Link to="/Terms" className="text-[#068a5b] text-sm hover:underline transition duration-500">Concordo com os termos e política de privacidade da Green World</Link>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <PrimaryButton 
            addClassName=""
             onClick={handleSubmit} 
             name="Cadastrar" />
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
