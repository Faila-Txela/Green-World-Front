import axios from "../../../../lib/axios";

class ValidatorImagesService {
  async create(validatorImage: validatorImage) {
    return await axios.post("/analise-imagem", validatorImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

    async getAll() {
      return await axios.get("/analise-imagem", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  
    async delete(id: string){
      const response = await axios.delete(`/analise-imagem/${id}`);
      return response.data;
    }
  
}

export const validatorImagesService = new ValidatorImagesService();