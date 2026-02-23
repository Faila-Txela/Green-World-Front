import axios from "../../../../lib/axios";
import { type agendar } from "modules/types/agendar";

class AgendarService {
    async create(agendarData: agendar){
        return await axios.post("/agendar", agendarData, {
            headers: {
                "Content-Type": "application/json",
              },
        })
    }

    async getAll(agendarData: agendar){
        return await axios.get("agendar", {
            params: agendarData
        })
    }
}

export const agendarService = new AgendarService()