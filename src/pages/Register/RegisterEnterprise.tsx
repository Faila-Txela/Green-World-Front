import { useCallback, useEffect, useState } from "react";
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
import CustomSelector from "../../components/custom/selector";
import { SiSitepoint } from "react-icons/si";
import Logo from "../../assets/Logo";
import { useQuery } from "@tanstack/react-query";
import { provinciaService } from "../../modules/service/api/provincia";
import { empresaService } from "../../modules/service/api/enpresa";
import { addressService } from "../../modules/service/api/address";
import { typeUserService } from "../../modules/service/api/typeUser";
import axios from "../../lib/axios";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  icon,
  extraPaddingRight = false,
}: {
  label: string;
  type: string;
  name: keyof EnterpriseFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  extraPaddingRight?: boolean;
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
    provinciaId: "",
  });

  const fetchProvincias = async () => {
    const response = await axios.get("/provincia");
    if (response.status === 200) {
      setProvincias(response.data);
    }
  };

  const fetchMunicipio = async (id: string) => {
    const response = await axios.get(`/municipio/provincia/${id}`);
    console.log(response.data);
    if (response.status === 200) {
      setMunicipios(response.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    try {
      const typeId = await typeUserService.getTypeIdByDeafault();
      const userData = {
        ...formData,
        tipoUser_id: typeId,
        iban: "",
        nome_titular: formData.nome,
      };
      const enderecoId = await addressService.getEnderecoIdByBairro(
        formData.bairro,
        formData.municipio,
        formData.provinciaId
      );
      const tipoEmpresaId = await empresaService.getTipoEmpresaIdByNome();

      const empresaData = {
        ...formData,
        enderecoId,
        tipoEmpresaId: tipoEmpresaId,
      };

      const response = await empresaService.create(empresaData);
      console.log("Resposta do servidor:", response);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Erro ao cadastrar empresa ❌:", error);
    }
  };
  useEffect(() => {
    fetchProvincias();
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

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <InputField
            label="Nome da Empresa"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            icon={<FaUser />}
          />
          <InputField
            label="Email da Empresa"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={<FaEnvelope />}
          />

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

          <InputField
            label="Telefone da Empresa"
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            icon={<FaPhone />}
          />

          <InputField
            label="Bairro"
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            icon={<FaCity />}
          />

            <InputField
              label="NIF"
              type="text"
              name="nif"
              value={formData.nif}
              onChange={handleChange}
              icon={<HiMiniIdentification />}
            />
            <InputField
              label="Site da Empresa"
              type="url"
              name="site"
              value={formData.site}
              onChange={handleChange}
              icon={<SiSitepoint />}
            />

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
              onChange={(e) => setMunicipio(e.target.value)}
            >
              <option value="" className="text-base">Selecione a provincia</option>
              {municipios.map((municipio) => (
                <option value={municipio.id}>{municipio.nome}</option>
              ))}
            </select>
          </div>

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
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option className="text-base" value="">Selecione a provincia</option>
              {provincias.map((provincia) => (
                <option value={provincia.id}>{provincia.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-2">
            <span>
              <input type="checkbox" name="" id="" />
            </span>
            <Link
              to="/Terms"
              className="text-[#068a5b] text-sm hover:underline transition duration-500"
            >
              Concordo com os termos e política de privacidade da Green World
            </Link>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <PrimaryButton addClassName="" name="Cadastrar" />
          </div>

          <div className="flex items-center justify-start col-span-1 md:col-span-2 gap-3">
            <span>Já tem uma conta?</span>
            <Link
              to="/Login"
              className="text-[#068a5b] text-base hover:underline transition duration-500"
            >
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
