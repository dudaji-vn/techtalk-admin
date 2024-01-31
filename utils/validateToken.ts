import { jwtDecode } from "jwt-decode";

type TDecodeToken = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};

export function validateToken(token: string): boolean {
  try {
    const decode: TDecodeToken = jwtDecode(token);
    const currentDate = Date.now() / 1000;
    return !!decode.userId && decode.exp > currentDate;
  } catch (error) {
    console.log(error);
    return false;
  }
}
