import axios from "../../../../lib/axios";

class EmpresaService {
  async create(empresaData: empresa) {
    return await axios.post("/empresas", empresaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getTipoEmpresaIdByNome() {
    try {
      const response = await axios.get(`/type/empresa`)
      return response.data.id;
    } catch (error) {
      console.error("Erro ao buscar tipoEmpresaId:", error);
      throw error;
    }
  }
}

export const empresaService = new EmpresaService();
