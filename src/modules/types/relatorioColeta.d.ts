type RelatorioColeta = {
    userId: string;
    amontoadoId: string;
    statusColeta: "RETIRADO" | "NAO_RETIRADO" | "PENDENTE";
    dataColeta: Date;
}