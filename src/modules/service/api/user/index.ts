import axios from "../../../../lib/axios";

class UserService{
    async getAll() {
        const { data } = await axios.get("/users");
        return data;
      }

    async create(dados: user){
        const { data, status } = await axios.post("users",  dados );
        return {data, status};
    }

    async delete(id: string) {
        const { data } = await axios.delete(`/users/${id}`);
        return data;
      }
}
export const userService = new UserService();