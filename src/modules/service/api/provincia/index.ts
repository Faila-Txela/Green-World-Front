import axios from "../../../../lib/axios";

class ProvinciaService{
     async getAll(){
        const { data } = await axios.get("/provincia");
        return data;
     }
}
export const provinciaService = new ProvinciaService();