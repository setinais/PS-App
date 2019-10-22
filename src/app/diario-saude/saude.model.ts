import { Tipo } from "../diario-saude-perguntas/tipo.model";

export interface Saude {
    id: number
    name: string
    day: string
    month: string
    year: string
    hours: string
    minutes: string
    tipos: Tipo[]
}