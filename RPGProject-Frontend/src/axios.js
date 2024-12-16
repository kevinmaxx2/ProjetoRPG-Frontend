import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type' : 'application/json',
    },
});

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
