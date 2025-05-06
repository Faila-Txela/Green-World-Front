import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/ui/PrimaryButton";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEyeSlash,
  FaEye,
  FaPhone,
  FaCity,
} from "react-icons/fa";
import { HiMiniIdentification } from "react-icons/hi2";
import { SiSitepoint } from "react-icons/si";
import Logo from "../../assets/Logo";
import { empresaService } from "../../modules/service/api/empresa";
import { addressService } from "../../modules/service/api/address";
import Toast from "../../components/ui/Toast";
import axios from "../../lib/axios";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  icon,
  extraPaddingRight = false
}: {
  label: string;
  type: string;
  name: keyof EnterpriseFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  extraPaddingRight?: boolean;
  autoComplete?: string;
}) => (
  <div className="relative">
    <label htmlFor={name} className="block text-gray-600 font-semibold mb-2">
      {label}
    </label>
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
        title={`Enter your ${label.toLowerCase()}`}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`w-full p-3 ${extraPaddingRight ? "pr-10" : "pr-3"} pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent`}
      />
    </div>
  </div>
);

interface EnterpriseFormData {
  nome: string;
  email: string;
  senha: string;
  tipoEmpresa_id: string;
  enderecoId: string;
  bairro: string;
  municipio: string;
  phone: string;
  nif: string;
  site: string;
  provinciaId: string;
}

export default function EnterpriseForm() {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [provincia, setProvincia] = useState<string>("");
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipio, setMunicipio] = useState<string>("");
  const [typeGarbages, setTypeGarbages] = useState<Municipio[]>([]);
  const [typeGarbage, setTypeGarbage] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
};

  const [formData, setFormData] = useState<EnterpriseFormData>({
    nome: "",
    email: "",
    senha: "",
    tipoEmpresa_id: "",
    enderecoId: "",
    municipio: "",
    phone: "",
    bairro: "",
    nif: "",
    site: "",
    provinciaId: ""
  });

  // Função para pegar as províncias
  const fetchProvincias = async () => {
    const response = await axios.get("/provincia");
    if (response.status === 200) {
      setProvincias(response.data);
    }
  };

  // Função para pegar os municípios
  const fetchMunicipio = async (id: string) => {
    const response = await axios.get(`/municipio/provincia/${id}`);
    //console.log(response.data);
    if (response.status === 200) {
      setMunicipios(response.data);
    }
  };

  // Função para pegar os tipos de empresa
  const fetchTypeGarbages = async () => {
    const response = await axios.get("/tipo-empresa");
    if (response.status === 200) {
      setTypeGarbages(response.data);
    }
  };

  // Função para o cadastro de empresas
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Dados enviados:", formData);
    setToast({ message: "Empresa cadastrada com sucesso!", type: "success" })

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

  if (!formData.phone.trim() || !/^\d{9,}$/.test(formData.phone)) {
    setToast({ message: "Por favor, insira um número de telefone válido!", type: "error" });
    return;
  }

  if (!formData.nif.trim() || formData.nif.length < 10) {
    setToast({ message: "O NIF da empresa deve conter 10 dígitos!", type: "error" });
    return;
  }

  if (!provincia) {
    setToast({ message: "Selecione uma província!", type: "error" });
    return;
  }

  if (!municipio) {
    setToast({ message: "Selecione um município!", type: "error" });
    return;
  }

  if (!typeGarbage) {
    setToast({ message: "Selecione a área de atuação da empresa!", type: "error" });
    return;
  }

  if (!(document.getElementById("terms") as HTMLInputElement)?.checked) {
    setToast({ message: "Você deve concordar com os termos e política de privacidade!", type: "error" });
    return;
  }
    
    try {
      const empresaData = {
        ...formData,
      };

      const {data} = await addressService.create(empresaData.bairro, municipio, provincia, empresaData.phone)
      const response = await empresaService.create({email: empresaData.email, enderecoId:data.id, nif: empresaData.nif, nome: empresaData.nome, senha: empresaData.senha, tipoEmpresa_id: typeGarbage, site: empresaData.site});
      
      //console.log("Resposta do servidor:", response);
      if (response.status === 201) {
        setTimeout(() => navigate("/enterprise-login"), 2000)
      }
    } catch (error) {
      //console.log("❌ Erro ao cadastrar sua empresa:", error);
      setToast({ message: "Erro ao cadastrar sua empresa", type: "error" })
    }
  };

  useEffect(() => {
    fetchProvincias();
    fetchTypeGarbages();
  }, []);

  useEffect(() => {
    if (provincia.trim() === "") return setMunicipios([])    
      
    fetchMunicipio(provincia);

  }, [provincia]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-2xl">
        <div className="text-center mb-6 flex flex-col items-center justify-center gap-2">
          <Logo className="w-20 h-20" />
          <h2 className="text-2xl font-bold text-gray-800">
            Cadastro da Empresa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <Link
            to="/register-personal"
            className="text-lg font-semibold flex items-center justify-center hover:text-green-800"
          >
            Cidadão Comum
          </Link>
          <Link
            to="/register-enterprise"
            className="text-lg font-semibold flex items-center justify-center underline hover:text-green-800"
          >
            Empresa
          </Link>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit} action="Admindashboard">
          <InputField
            label="Nome da Empresa *"
            type="text"
            name="nome"
            autoComplete="on"
            value={formData.nome}
            onChange={handleChange}
            icon={<FaUser />}
          />
          <InputField
            label="Email da Empresa"
            type="email"
            name="email"
            autoComplete="on"
            value={formData.email}
            onChange={handleChange}
            icon={<FaEnvelope />}
          />

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

          <InputField
            label="Telefone da Empresa"
            type="phone"
            name="phone"
            autoComplete="on"
            value={formData.phone}
            onChange={handleChange}
            icon={<FaPhone />}
          />

          <InputField
            label="Bairro"
            type="text"
            name="bairro"
            autoComplete="on"
            value={formData.bairro}
            onChange={handleChange}
            icon={<FaCity />}
          />

            <InputField
              label="NIF"
              type="number"
              name="nif"
              autoComplete="on"
              value={formData.nif}
              onChange={handleChange}
              icon={<HiMiniIdentification />}
            />
            <InputField
              label="Site da Empresa"
              type="url"
              name="site"
              autoComplete="on"
              value={formData.site}
              onChange={handleChange}
              icon={<SiSitepoint />}
            />
  
          <div>
            <label
              htmlFor="provincia"
              className="block text-gray-600 font-semibold mb-2"
            >
              Sua Provincia
            </label>
            <select
            className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              value={provincia}
              autoComplete="on"
              onChange={(e) => setProvincia(e.target.value)}
              title="Selecione sua província"
            >
              <option className="" key="" value="">Selecione a provincia</option>
              {provincias.map((provincia) => (
                <option value={provincia.id}>{provincia.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="municipio"
              className="font-semibold mb-2 block text-gray-600"
            >
              Seu Municipio
            </label>

            <select
            className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              value={municipio}
              autoComplete="on"
              onChange={(e) => setMunicipio(e.target.value)}
              title="Selecione seu município"
            >
              <option value="" key="" className="">Selecione o município</option>
              {municipios.map((municipio) => (
                <option value={municipio.id}>{municipio.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="tipoEmpresa"
              className="font-semibold mb-2 block text-gray-600"
            >
              Com que você trabalha ?
            </label>

            <select
            className="flex w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              value={typeGarbage}
              autoComplete="on"
              onChange={(e) => setTypeGarbage(e.target.value)}
              title="Selecione a sua área de actuação"
            >
              <option value="" key="" className="">Selecione a sua área de actuação</option>
              {typeGarbages.map((typeGarbage) => (
                <option value={typeGarbage.id}>{typeGarbage.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-2">
            <span>
              <input type="checkbox" name="terms" id="terms" title="Agree to terms and privacy policy" />
            </span>
            <Link to="/Terms" className="text-[#068a5b] text-sm hover:underline transition duration-500">Concordo com os termos e política de privacidade da Green World</Link>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <PrimaryButton addClassName="" name="Cadastrar" />
          </div>

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-3">
            <span>Já tem uma conta?</span>
            <Link
              to="/enterprise-login"
              className="text-[#068a5b] text-base hover:underline transition duration-500"
            >
              Entrar
            </Link>
          </div>
        </form>
              {/* Exibe o Toast se houver mensagem */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}
