// src/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function LoginForm() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', form);
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            setMensaje('Credenciales incorrectas');
        }
    };

    return (
        <div className="auth-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo electrónico" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    value={form.password} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
