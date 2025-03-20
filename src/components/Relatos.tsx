import UploadArea from "../components/upload-area/single";
import CustomSelector from "../components/custom/selector";
import PrimaryButton from "../components/ui/PrimaryButton";
import Textarea from "../components/ui/TextArea";
import { useState } from "react";

export default function Relatos() {
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectPriority, setSelectPriority] = useState<string>();

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">

      {/* Cabeçalho */}
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-green-800 mb-3">Relate um Amontoado de Lixo</h2>
        <p className="text-gray-700 text-sm mb-3">Ajude-nos a manter nossa cidade limpa. Preencha os campos abaixo para reportar um acúmulo de lixo.</p>
        <p className="text-gray-700 text-sm"><b className="text-red-700">*</b> Campos obrigatórios</p>
      </div>

      {/* Formulário */}
      <form className="flex flex-col gap-6 mt-5 rounded-lg shadow-lg w-full max-w-lg p-6 bg-white">

        {/* Localidade */}
        <div>
          <label
            htmlFor="localidade"
            className="text-body font-semibold text-gray-700 mb-2"
          >
            Sua Localidade <b className="text-red-700">*</b>
          </label>
          <CustomSelector
            onChange={(e) => setSelectedProvince(e)}
            value={selectedProvince}
            items={[
              { label: "Luanda", value: "1" },
              { label: "Camama", value: "2" },
              { label: "Rangel", value: "3" },
              { label: "Maianga", value: "4" },
              { label: "Mussulo", value: "5" },
              { label: "Belas", value: "6" },
              { label: "Viana", value: "7" },
              { label: "Cazenga", value: "8" },
              { label: "Hoji-Ya-Henda", value: "9" },
              { label: "Samba", value: "10" },
              { label: "Mutamba", value: "11" },
              { label: "Ngola Kiluange", value: "12" },
            ]}
          />
        </div>

        {/* Prioridade */}
        <div>
          <label
            htmlFor="prioridade"
            className="text-body font-semibold text-gray-700 mb-2"
          >
            Prioridade <b className="text-red-700">*</b>
          </label>
          <CustomSelector
            onChange={(e) => setSelectPriority(e)}
            value={selectPriority}
            items={[
              { label: "Baixa", value: "baixa" },
              { label: "Elevada", value: "elevada" },
            ]}
          />
        </div>

        {/* Descrição */}
        <div>
          <label
            htmlFor="descricao"
            className="text-body font-semibold text-gray-700 mb-2"
          >
            Descrição do Acúmulo <b className="text-red-600">*</b>
          </label>
          <Textarea
            id="descricao"
            placeholder="Ex: Em minha zona está em péssimo estado. O lixo está se acumulando há dias."
            className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Upload de Foto */}
        <div>
          <label
            htmlFor="foto"
            className="text-body font-semibold text-gray-700 mb-2"
          >
            Carregar Foto <b className="text-red-600">*</b>
          </label>
          <UploadArea />
        </div>

        {/* Botão de Envio */}
        <div className="flex justify-center">
          <PrimaryButton name="Enviar Relato" addClassName="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105" />
        </div>
      </form>

      {/* Feedback interativo */}
      <div className="mt-6 text-center text-gray-600">
        <p>Após o envio, sua solicitação será processada e você receberá um feedback sobre a situação do seu relato.</p>
        <p className="mt-2 text-sm">Obrigado por ajudar a manter nossa cidade limpa!</p>
      </div>

    </div>
  );
}
