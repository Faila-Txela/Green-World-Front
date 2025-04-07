import axios from "lib/axios";

class AuthService {
    async login(dataToLogin: loginData) {
        const { data } = await axios.post("user/login", dataToLogin);
        return data;
    }
}

export const authService = new AuthService()
