export interface LoginInterface {
    username: string,
    password: string
}

export interface LoginResponseInterface {
    id: number,
    username: string,
    token: string
}