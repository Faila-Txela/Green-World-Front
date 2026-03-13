import axios from "../../../../lib/axios";
import { type suporte } from "modules/types/suporte";

class SuporteService{
    async create(suporteData: suporte){
        const { data } = await axios.post("/suporte", suporteData);
        return data;
    }

    async getAll(){
        return await axios.get("/suporte")
    }

    // Envio de email, sem funcionamento ainda
    async sendReply(payload: { email: string; subject: string; message: string }) {
      const { data } = await axios.post("/responder-contacto", payload);
      return data;
   }

 }

export const suporteService = new SuporteService()