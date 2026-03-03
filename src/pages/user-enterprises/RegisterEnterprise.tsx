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
  required = true,
  placeholder
}: {
  label: string;
  type: string;
  name: keyof EnterpriseFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  autoComplete?: string;
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
          className={`w-full p-3 pl-10 ${isPasswordField ? "pr-10" : "pr-3"} border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent`}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

interface EnterpriseFormData {
  nome: string;
  email: string;
  senha: string;
  enderecoId: string;
  bairro: string;
  municipio: string;
  phone: string;
  nif: string;
  site: string;
  provinciaId: string;
}

interface Provincia { id: string; nome: string; }
interface Municipio { id: string; nome: string; }

export default function EnterpriseForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [provincia, setProvincia] = useState<string>("");
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipio, setMunicipio] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [formData, setFormData] = useState<EnterpriseFormData>({
    nome: "",
    email: "",
    senha: "",
    enderecoId: "",
    municipio: "",
    phone: "",
    bairro: "",
    nif: "",
    site: "",
    provinciaId: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchProvincias = async () => {
    try {
      const response = await axios.get("/provincia");
      if (response.status === 200) setProvincias(response.data);
    } catch (err) { console.error(err); }
  };

  const fetchMunicipio = async (id: string) => {
    try {
      const response = await axios.get(`/municipio/provincia/${id}`);
      if (response.status === 200) setMunicipios(response.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.nome.trim()) {
      setToast({ message: "O nome da empresa é obrigatório!", type: "error" });
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

    if (!formData.phone.trim() || !/^\d{9,}$/.test(formData.phone)) {
      setToast({ message: "Por favor, insira um número de telefone válido!", type: "error" });
      setLoading(false);
      return;
    }

    if (!formData.nif.trim() || !/^\d{9}$/.test(formData.nif)) {
      setToast({ message: "O NIF da empresa deve conter 9 dígitos válidos!", type: "error" });
      setLoading(false);
      return;
    }

    if (!provincia) {
      setToast({ message: "Selecione uma província!", type: "error" });
      setLoading(false);
      return;
    }

    if (!municipio) {
      setToast({ message: "Selecione um município!", type: "error" });
      setLoading(false);
      return;
    }

    if (!(document.getElementById("terms") as HTMLInputElement)?.checked) {
      setToast({ message: "Você deve concordar com os termos e política de privacidade!", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const { data } = await addressService.create({ bairro: formData.bairro, municipioId: municipio, provinciaId: provincia, telefone: formData.phone, rua: formData.bairro });
      const response = await empresaService.create({ email: formData.email, enderecoId: data.id, nif: formData.nif, nome: formData.nome, senha: formData.senha, site: formData.site });

      if (response.status === 201) {
        setToast({ message: "Empresa cadastrada com sucesso!", type: "success" });
        setTimeout(() => navigate("/enterprise-login"), 2000);
      }
    } catch (error) {
      console.error("❌ Erro ao cadastrar sua empresa:", error);
      setToast({ message: "Erro ao cadastrar sua empresa", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProvincias(); }, []);

  useEffect(() => {
    if (provincia.trim() === "") return setMunicipios([]);
    fetchMunicipio(provincia);
  }, [provincia]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="w-full max-w-4xl p-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl border border-gray-50">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 text-green-700">
            <Logo className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Cadastro da Empresa</h2>
          <p className="text-gray-500 mt-2">Faça parte da nossa comunidade sustentável</p>
        </div>

        <div className="flex border-b mb-8">
          <Link to="/register-personal" className="flex-1 text-center py-3 text-gray-400 font-medium hover:text-green-600 transition-colors">
            Cidadão Comum
          </Link>
          <div className="flex-1 text-center py-3 text-green-700 font-bold border-b-4 border-green-600">
            Empresa
          </div>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              placeholder="Ex: Green Tech Lda"
              label="Nome da Empresa"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              icon={<FaUser />}
            />
            <InputField
              placeholder="empresa@email.com"
              label="Email da Empresa"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              icon={<FaEnvelope />}
            />

            <InputField
              placeholder="******"
              label="Senha"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              icon={<FaLock />}
            />

            <InputField
              placeholder="9xx xxx xxx"
              label="Telefone da Empresa"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={<FaPhone />}
            />

            <InputField
              placeholder="NIF da Instituição"
              label="NIF"
              type="text"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              icon={<HiMiniIdentification />}
            />
            <InputField
              placeholder="https://..."
              label="Site da Empresa"
              type="url"
              name="site"
              value={formData.site}
              onChange={handleChange}
              icon={<SiSitepoint />}
              required={false}
            />

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                <label className="block text-gray-600 font-semibold mb-2 text-sm">
                  Sua Provincia <span className="text-red-500">*</span>
                </label>
                <select
                  title="provincia"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  required
                >
                  <option value="">Selecione a provincia</option>
                  {provincias.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-600 font-semibold mb-2 text-sm">
                  Seu Municipio <span className="text-red-500">*</span>
                </label>
                <select
                  title="municipio"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  required
                >
                  <option value="">Selecione o município</option>
                  {municipios.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
                </select>
              </div>

              <InputField
                placeholder="Bairro/rua"
                label="Bairro"
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                icon={<FaCity />}
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
              addClassName="bg-primary text-white mt-6 font-semibold w-full" 
              name={loading ? "Processando..." : "Criar Conta"} 
            />
          
            <div className="text-center text-gray-600 text-sm">
              Já tem uma conta? <Link to="/enterprise-login" className="text-primary hover:underline transition duration-500">Entrar agora</Link>
            </div>
          </div>
        </form>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}