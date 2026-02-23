export type relatar = {
    userId: string
    descricao: string
    latitude: string
    longitude: string
    provinciaId: string
    municipioId: string
    prioridade: string
    bairro?: string
    analiseImagem: File
}