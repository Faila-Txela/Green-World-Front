import axios from "../../../../lib/axios";

class RelatorioColetaService {
    async create(relatorioColeta: RelatorioColeta) {
        return await axios.post("relatorio-coleta", relatorioColeta, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    async getAll(relatorioColeta: Partial<RelatorioColeta>) {
        return await axios.get("relatorio", {
            params: relatorioColeta,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    async updateStatus(id: string, status: "RETIRADO" | "NAO_RETIRADO" | "PENDENTE") {
        return await axios.patch(`relatorio/:${id}/status`, { statusColeta: status }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    
    async delete(id: string) {
        return await axios.delete(`relatorio/:${id}`);
    }
}

export const relatorioColetaService = new RelatorioColetaService()