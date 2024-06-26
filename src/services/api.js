import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333/api/v1/'
    // baseURL: 'https://ws.fxbank.com.br/api/v1/'
});

export default api;