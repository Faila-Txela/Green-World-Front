import axios from "../../../../lib/axios";
class ValidatorImagesService {
  async create(formData: FormData) {
    return await axios.post("/analise-imagem/criar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async delete(id: string) {
    const response = await axios.delete(`/analise-imagem/${id}`);
    return response.data;
  }
}


export const validatorImagesService = new ValidatorImagesService();