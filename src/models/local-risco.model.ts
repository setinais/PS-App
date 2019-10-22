import {LocalizacaoModel} from "~/models/visualizacao.model";

export class LocalRiscoModel {
    id: number
    descricao: string
    endereco: string
    bairro: string
    localizacao: LocalizacaoModel
    imagens: string
    created_at: string
}
