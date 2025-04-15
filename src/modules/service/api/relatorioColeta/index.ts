import axios from "../../../../lib/axios";

class RelatorioColetaService {
    async create(relatorioColeta: RelatorioColeta){
        return await axios.post("relatorio", relatorioColeta, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    async getAll(relatorioColeta: RelatorioColeta){
        return await axios.get("relatorio", {
            params: relatorioColeta,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}

export const relatorioColetaService = new RelatorioColetaService()