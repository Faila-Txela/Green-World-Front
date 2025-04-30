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

    async updateStatus(id: string, status: "RETIRADO" | "NAO_RETIRADO" | "PENDENTE") {
        return await axios.patch(`/relatorio/${id}/status`, { status });
      }
    
      async delete(id: string) {
        return await axios.delete(`/relatorio/${id}`);
      }

}

export const relatorioColetaService = new RelatorioColetaService()