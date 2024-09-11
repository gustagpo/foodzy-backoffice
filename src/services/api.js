import axios from "axios";

const api = axios.create({
    baseURL: 'https://ws.foodzy.com.br/api/v1/'
});

export default api;