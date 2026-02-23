import axios from "../../../../lib/axios";

class MunicipioService {
  async getAll() {
    const { data } = await axios.get("/municipio");
    return data;
  }

  async create(payload: { nome: string }) {
    const { data } = await axios.post("/municipio", payload);
    return data;
  }

  async update(id: string, payload: { nome: string }) {
    const { data } = await axios.put(`/municipio/${id}`, payload);
    return data;
  }

  async delete(id: string) {
    const { data } = await axios.delete(`/municipio/${id}`);
    return data;
  }
}

export const municipioService = new MunicipioService();
