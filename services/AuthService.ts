import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  static _getBaseApiUrl() {
    return process.env.NEXT_PUBLIC_API_DOMAIN;
  }

  static async login(data: LoginData) {
    return await axios.post(
      `${AuthService._getBaseApiUrl()}/auth/login/`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
