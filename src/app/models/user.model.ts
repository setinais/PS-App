export class UserModel{
    name: string
    password: string
    email: string
    data_nascimento: string
    sexo: string
    cpf: string
    cartao_sus: string
}

export class UserValidator{
    name: Array<string>
    password: Array<string>
    email: Array<string>
    data_nascimento: Array<string>
    sexo: Array<string>
    cpf: Array<string>
    cartao_sus: Array<string>
}
