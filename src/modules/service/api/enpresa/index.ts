import axios from "../../../../lib/axios";

class EmpresaService{
    async create(empresaData: empresa){
        const { data } = await axios.post("/empresa", empresaData);
        return data;
    }
}
export const empresaService = new EmpresaService();