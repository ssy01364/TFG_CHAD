// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Asegúrate de que coincida con tu backend
    withCredentials: true, // Habilitar credenciales para Sanctum
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
