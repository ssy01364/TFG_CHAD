// src/RegisterForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './styles/RegisterForm.css'; // Asegúrate de tener este archivo de CSS

export default function RegisterForm() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: '',
        rol: 'cliente' // Por defecto, rol de cliente
    });
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setLoading(true);

        try {
            const res = await api.post('/register', form);
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    setMensaje("❌ El correo ya está registrado.");
                } else {
                    setMensaje("❌ Error al registrarse. Verifica tus datos.");
                }
            } else {
                setMensaje("❌ No se pudo conectar al servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="nombre" 
                    placeholder="Nombre completo" 
                    value={form.nombre} 
                    onChange={handleChange} 
                    required 
                />
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
                <select name="rol" value={form.rol} onChange={handleChange}>
                    <option value="cliente">Cliente</option>
                    <option value="empresa">Empresa</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
    );
}
