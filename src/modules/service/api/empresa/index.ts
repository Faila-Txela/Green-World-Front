import axios from "../../../../lib/axios";

class EmpresaService {
  async create(empresaData: empresa) {
    return await axios.post("/empresas", empresaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async logOut() {
    return await axios.post("/empresas/logOut");
  }

  async getAll(){
    return await axios.get("/empresas", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getTipoEmpresaIdByNome() {
    try {
      const response = await axios.get(`/type/empresa`)
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar tipoEmpresaId:", error);
      throw error;
    }
  }

  async verifyPassword(senha: string) {
    return await axios.post("/empresas/verify-password", { senha });
  }

  async delete(id: string) {
    const { data } = await axios.delete(`/empresas/${id}`);
    return data;
  }

}

export const empresaService = new EmpresaService();
