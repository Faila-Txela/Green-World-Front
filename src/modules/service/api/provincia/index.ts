import axios from "../../../../lib/axios";

class ProvinciaService{
     async getAll(){
        const { data } = await axios.get("/provincia");
        return data;
     }

     async create(data: { nome: string }){
      const response = await axios.post("/provincia", data);
      return response.data;
     }

     async update(id: string, data: { nome: string }){
      const response = await axios.put(`/provincia/${id}`, data);
      return response.data;
     }
     
     async delete(id: string){
      const response = await axios.delete(`/provincia/${id}`);
      return response.data;
     }
}
export const provinciaService = new ProvinciaService();