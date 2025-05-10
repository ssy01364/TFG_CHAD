// src/RegisterForm.jsx
import React, { useState } from 'react';
import axios from './api';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('cliente');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/register', { nombre, email, password, rol });
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="cliente">Cliente</option>
                <option value="empresa">Empresa</option>
            </select>
            <button type="submit">Registrarse</button>
        </form>
    );
}
