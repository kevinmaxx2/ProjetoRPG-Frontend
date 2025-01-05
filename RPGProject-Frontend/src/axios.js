import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});
axiosInstance.interceptors.request.use(async function (config) {
    if (!config.url.includes('/sanctum/csrf-cookie')) {
        await axiosInstance.get('/sanctum/csrf-cookie');
    }
    

    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1];
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
});
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
           
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);