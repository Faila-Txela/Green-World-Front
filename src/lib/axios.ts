import axios from "axios";

export default axios.create(
    {
        baseURL: 'https://green-world-back.onrender.com/',
        withCredentials: true
        //baseURL: 'localhost://3003'
    }
)