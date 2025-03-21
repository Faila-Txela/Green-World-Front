import axios from "../../../../lib/axios";

class AddressService{
    async create(enderecoData: endereco){
        const { data } = await axios.post("/address", enderecoData);
        return data;
    }
}
export const addressService = new AddressService();