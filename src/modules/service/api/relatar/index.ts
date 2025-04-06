import axios from "../../../../lib/axios";

class RelatarService {
  async create(relatarData: relatar) {
    return await axios.post("/relatar", relatarData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getAll() {
    return await axios.get("/relatar", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

}

export const relatarService = new RelatarService;
