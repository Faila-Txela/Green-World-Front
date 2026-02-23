import axios from "../../../../lib/axios";
import { type contacto } from "modules/types/contact";

class ContactoService{
    async create(contactoData: contacto){
        const { data } = await axios.post("/contacto", contactoData);
        return data;
    }

    async getAll(){
        return await axios.get("/contacto")
    }

    // Envio de email, sem funcionamento ainda
    async sendReply(payload: { email: string; subject: string; message: string }) {
      const { data } = await axios.post("/responder-contacto", payload);
      return data;
   }

 }

export const contactoService = new ContactoService()