export type relatorioColeta = {
    userId: string;
    amontoadoId: string;
    statusColeta: "RETIRADO" | "NAO_RETIRADO" | "PENDENTE";
    dataColeta: Date;
}