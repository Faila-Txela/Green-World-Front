import axios from "../../../../lib/axios";

class UserService{
    async create(dados: user){
        const { data, status } = await axios.post("users",  dados );
        return {data, status};
    }
}
export const userService = new UserService();