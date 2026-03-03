import axios from "../../../../lib/axios";
import type { empresa } from "modules/types/empresa";

class EmpresaService {
  async create(empresaData: empresa) {
    return await axios.post("/empresas", empresaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAll(){
    return await axios.get("/empresas");
  }

  async logOut() {
    return await axios.post("/empresas/logOut");
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
