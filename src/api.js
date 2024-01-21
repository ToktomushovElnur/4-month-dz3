import axios from "axios";

export const DammyjsonAPI = axios.create({
    baseURL: " https://dummyjson.com/"
})