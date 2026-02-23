import axios from "../../../../lib/axios";
import type { user } from "modules/types/user";

class UserService{

  async create(dados: user){
        const { data, status } = await axios.post("/users",  dados );
        return {data, status};
  }

    async logOut() {
        return await axios.post("/empresas/logOut");
      }

  async getAll(){
        return await axios.get("/users")
  }

  async verifyPassword(senha: string) {
        const { data } = await axios.post("/user/verify-password", { senha });
        return data;
  }

  async delete(id: string) {
        const response = await axios.delete(`/user/delete-account/${id}`);
        return response.data; 
    }

}
export const userService = new UserService();