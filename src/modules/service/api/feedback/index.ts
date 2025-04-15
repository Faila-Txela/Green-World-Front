import axios from "../../../../lib/axios";

class FeedbackService{
    async create(feedbackData: feedback){
        const { data } = await axios.post("/feedback", feedbackData);
        return data;
    }

    async getAll(feedbackData: feedback){
        return await axios.get("feedback", {
            params: feedbackData,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}

export const feedbackService = new FeedbackService()