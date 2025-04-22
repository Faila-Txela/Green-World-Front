import axios from "../../../../lib/axios";

class FeedbackService{
    async create(feedbackData: feedback){
        const { data } = await axios.post("/feedback", feedbackData);
        return data;
    }

    async getAll(){
        return await axios.get("feedback")
    }
}

export const feedbackService = new FeedbackService()