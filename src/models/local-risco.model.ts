import {LocalizacaoModel} from "~/models/visualizacao.model";

export class LocalRiscoModel {
    id: number
    nome: string
    endereco: string
    bairro: string
    localizacao: LocalizacaoModel
    imagens: Array<string>
    created_at: string
}
