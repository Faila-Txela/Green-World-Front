import axios from "../../../../lib/axios";

class AddressService {
    async getEnderecoIdByBairro(bairro: string, municipio: string, provinciaId: string) {
        try {
            const response = await axios.get(`/address`, {
                params: { bairro, municipio, provinciaId }
            });
            return response.data.id;
        }
        catch (error) {
            console.error("Erro ao buscar endereco", error);
            throw error;
        }
    }

    async create(bairro: string, municipioId: string, provinciaId: string, telefone: string) {
        try {
            const response = await axios.post(`/address`, {
                bairro, municipioId, provinciaId, telefone
            }
            );
            return response;
        }
        catch (error) {
            console.error("Erro ao buscar endereco", error);
            throw error;
        }
    }
}
export const addressService = new AddressService();