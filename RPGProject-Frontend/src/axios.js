import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
    }
});
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
           
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);