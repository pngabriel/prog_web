import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.57:8083"
})
export default api;