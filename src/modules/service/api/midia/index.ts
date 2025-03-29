import axios from "../../../../lib/axios";

class MidiaService {
  async create(midiaData: midia) {
    return await axios.post("/midia", midiaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

//   async getTipoEmpresaIdByNome() {
//     try {
//       const response = await axios.get(`/type/empresa`)
//       return response.data;
//     } catch (error) {
//       console.error("Erro ao buscar tipoEmpresaId:", error);
//       throw error;
//     }
//   }
}

export const midiaService = new MidiaService();