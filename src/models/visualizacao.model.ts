export class VisualizacaoModel{
    id: number
    nome: string
    localizacao: LocalizacaoModel
    endereco: string
    bairro: string
    telefone: string
    descricao: string
    servicos: Array<any>
    cidade: string
    estado: string
    imagem: string
    created_at: string

}
export class LocalizacaoModel {
    latitude: number
    longitude: number
}
