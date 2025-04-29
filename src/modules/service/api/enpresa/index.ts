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

  async deleteAccount() {
    return await axios.delete("/empresas");
  }

}

export const empresaService = new EmpresaService();
