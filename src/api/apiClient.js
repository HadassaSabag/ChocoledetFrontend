
import axios from "axios"
export const apiClient = axios.create({
    baseURL: "https://chocoledetbackend.onrender.com/api/",
    headers: {
        'Content-Type' : 'application/json'
    }
}) 
