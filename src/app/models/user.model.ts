export class UserModel{
    nome: string
    password: string
    email: string
    data_nascimento: string
    sexo: string
    cpf: string
    cartao_sus: string
}

export class UserValidator{
    nome: Array<string>
    password: Array<string>
    email: Array<string>
    data_nascimento: Array<string>
    sexo: Array<string>
    cpf: Array<string>
    carta_sus: Array<string>
}
