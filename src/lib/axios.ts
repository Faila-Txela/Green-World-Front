import axios from "axios";

export default axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3003',
        withCredentials: true,
        //baseURL: 'http://127.0.0.1:3003'
    }
)