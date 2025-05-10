// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from './api'; // Asegúrate de que tu archivo api.js esté configurado correctamente

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            loadUser();
        }
    }, [token]);

    const loadUser = async () => {
        try {
            const res = await axios.get('/usuario');
            setUser(res.data);
        } catch {
            setUser(null);
            setToken('');
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('/login', { email, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        loadUser();
    };

    const logout = async () => {
        await axios.post('/logout');
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
