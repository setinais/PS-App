import { Tipo } from "../diario-saude-perguntas/tipo.model";

export interface Saude {
    name: string
    date: Date
    tipos: Tipo[]
}