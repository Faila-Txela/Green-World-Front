import axios from "../../../../lib/axios";

class TypeGarbage{
    async getAll(){
        const { data } = await axios.get("/tipo-empresa");
        return data;
    }
    async getTypeIdByDeafault(){
        const { data } = await axios.get("/type");
        return data;
    }
}
export const typeGarbage = new TypeGarbage();