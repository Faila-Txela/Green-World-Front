import axios from "../../../../lib/axios";
import type {address} from "../../../types/address"
class AddressService {
    async getEnderecoIdByBairro(bairro: string, municipio: string, provinciaId: string) {
        try {
            const response = await axios.get(`/address`, {
                params: { bairro, municipio, provinciaId }
            });
            return response.data.id;
        }
        catch (error) {
            console.error("Erro ao buscar endereço", error);
            
            throw error;
        }
    }

    async create(adressData: address){
        return await axios.post("/address", adressData, {
            headers: {
                "Content-Type": "application/json",
              },
        })
    }
}
export const addressService = new AddressService();
