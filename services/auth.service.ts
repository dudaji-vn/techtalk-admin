import { authEndpoint } from "@/const/api-endpoint";
import { IFormLogin } from "@/interfaces/auth.interface";
import { IApiResponse } from "@/interfaces/http.interface";
import http from "./http.service";

class AuthService {
  async login(user: IFormLogin): Promise<string> {
    const res = await http.post<IApiResponse<string>>(authEndpoint.login, user);
    return res.data.data;
  }
}

export const authService = new AuthService();
