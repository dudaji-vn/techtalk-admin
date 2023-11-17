import { authEndpoint } from "@/const/apiEndpoint";
import { IFormLogin } from "@/interfaces/auth";
import { IApiResponse } from "@/interfaces/http";
import http from "./http.service";

class AuthService {
  async login(user: IFormLogin): Promise<string> {
    const res = await http.post<IApiResponse<string>>(authEndpoint.login, user);
    return res.data.data;
  }
}

export const authService = new AuthService();
