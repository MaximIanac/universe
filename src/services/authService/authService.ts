import http from "../http";
import { LoginInterface, LoginResponseInterface } from "./auth-response.interface";

export const login = async (data: LoginInterface): Promise<LoginResponseInterface> => {
    const response = await http.post<LoginResponseInterface>("auth/login", data);
    return response.data;
}
