import axios from "../../../../lib/axios";

class UserService{

  async create(dados: user){
        const { data, status } = await axios.post("users",  dados );
        return {data, status};
  }

  async getAll(){
        return await axios.get("users", {
          headers: {
           "Content-Type": "application/json",
          },
        })
  }

  async verifyPassword(senha: string) {
        const { data } = await axios.post("/user/verify-password", { senha });
        return data;
  }

  async delete(id: string) {
        const { data } = await axios.delete(`/users/${id}`);
        return data; 
    }

  async logOut() {
        return await axios.post("/empresas/logOut");
      //return await axios.post("/users/logOut");
      }
}
export const userService = new UserService();