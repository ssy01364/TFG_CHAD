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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje('');
        
        try {
            const res = await api.post('/login', form);
            login(res.data.user, res.data.token);
            setForm({ email: '', password: '' });
            navigate('/');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    setMensaje('Correo electrónico o contraseña incorrectos.');
                } else if (err.response.status === 500) {
                    setMensaje('Error del servidor. Intenta nuevamente más tarde.');
                } else {
                    setMensaje('Error desconocido. Verifica tus datos.');
                }
            } else {
                setMensaje('No se pudo conectar al servidor.');
            }
        } finally {
            setLoading(false);
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
                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Login"}
                </button>
            </form>
            {mensaje && <p className="error-message">{mensaje}</p>}
        </div>
    );
}
