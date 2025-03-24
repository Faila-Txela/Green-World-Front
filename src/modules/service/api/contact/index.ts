import axios from "../../../../lib/axios";

class ContactoService{
    async create(contactoData: empresa){
        const { data } = await axios.post("/contacto", contactoData);
        return data;
    }
}

export const contactoService = new ContactoService()