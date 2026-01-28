import axios from 'axios';

// URL do Gateway API (Nginx)
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});


// Interceptor para adicionar o token JWT em cada requisição
api.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('@App:token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;