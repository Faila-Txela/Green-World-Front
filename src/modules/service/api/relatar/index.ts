import axios from "../../../../lib/axios";

class RelatarService {
  async create(relatarData: FormData) {
    return await axios.post("/relatar", relatarData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAll() {
    return await axios.get("/relatar", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async delete(id: string){
    const response = await axios.delete(`/relatar/${id}`);
    return response.data;
  }

  async updateStatus(id: string, status: "pendente" | "resolvido" | "rejeitado") {
    return await axios.patch(`/relatar/${id}/status`, { status }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

}

export const relatarService = new RelatarService;
