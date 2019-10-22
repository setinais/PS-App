export class UserModel{
    id: number
    name: string
    password: string
    email: string
    data_nascimento: string
    sexo: string
    cpf: string
    avatar: string
    role_id: number
    cartao_sus: string
    created_at: string
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
