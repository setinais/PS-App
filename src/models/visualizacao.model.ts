export class VisualizacaoModel{
    type: string
    id: number
    nome: string
    localizacao: LocalizacaoModel
    endereco: string
    bairro: string
    telefone: string
    created_at: string

}
export class LocalizacaoModel {
    latitude: number
    longitude: number
}
