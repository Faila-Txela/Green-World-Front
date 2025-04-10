type validatorImage = {
    imageURL: File
    labels: string[]
    analysisDate: Date
    amontoadoRelatadoId: string
    status: "pendente" | "aprovado" | "rejeitado"
}