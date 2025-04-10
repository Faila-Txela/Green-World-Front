import axios from "../../../../lib/axios";

class ValidatorImagesService {
  async create(validatorImage: validatorImage) {
    return await axios.post("/analise-imagem", validatorImage, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const validatorImagesService = new ValidatorImagesService();