import axios from "lib/axios";
import type { loginData } from "modules/types/login";

class AuthService {
    async login(dataToLogin: loginData) {
        const { data } = await axios.post("user/login", dataToLogin);
        return data;
    }
}

export const authService = new AuthService()
