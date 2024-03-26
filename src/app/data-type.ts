export interface signUp {
    name: string,
    email: string,
    password: string
}

export interface login {
    id: number,
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
    quantity?: number,
}

export interface Cart {
    id?: number,
    name: string,
    category: string,
    color: string,
    price: string,
    description: string,
    image: string,
    quantity?: number,
    userid: number
}

export interface CartSummary {
    subtotal: number,
    discount: number,
    delivery: number,
    tax: number,
    total: number
}
