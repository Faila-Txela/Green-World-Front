import axios from "../../../../lib/axios";

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
            params: agendarData,
            headers: {
                "Content-Type": "application/json",
              },
        })
    }
}

export const agendarService = new AgendarService()