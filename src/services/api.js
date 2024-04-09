import axios from 'axios';

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

});

export default api;