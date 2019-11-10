import {LocalizacaoModel} from "~/models/visualizacao.model";

export class LocalRiscoModel {
    id: number
    descricao: string
    endereco: string
    bairro: string
    imagem: any
    location: LocalizacaoModel
    created_at: string
}
