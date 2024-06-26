import axios from "axios";

const api = axios.create({
    baseURL: 'https://ws.fxbank.com.br/api/v1/'
});

export default api;