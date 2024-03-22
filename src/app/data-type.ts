export interface signUp {
    name: string,
    email: string,
    password: string
}

export interface login {
    email: string,
    password: string
}

export interface Product {
    id?: number,
    name: string,
    category: string,
    color: string,
    price: string,
    description: string,
    image: string,
    quantity?: number
}
