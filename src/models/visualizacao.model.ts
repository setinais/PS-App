export class VisualizacaoModel{
    nome: string
    localizacao: LocalizacaoModel
    endereco: string
    bairro: string
    telefone: string
    descricao: string
    servicos: Array<any>
    imagem: string
    created_at: string

}
export class LocalizacaoModel {
    latitude: number
    longitude: number
}
