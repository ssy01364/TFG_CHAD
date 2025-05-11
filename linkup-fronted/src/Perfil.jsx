// src/Perfil.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from './api';
import { useNavigate } from 'react-router-dom';
import './styles/Perfil.css'; // Asegúrate de tener este archivo de CSS

export default function Perfil() {
    const { user, logout } = useContext(AuthContext);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setNombre(user.nombre);
            setEmail(user.email);
            setRol(user.rol);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje('');
        try {
            await axios.put(`/usuario`, { nombre, email }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMensaje("✅ Perfil actualizado correctamente.");
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            setMensaje("❌ Hubo un problema al actualizar el perfil.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
            try {
                await axios.delete(`/usuario`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                await logout();
                navigate('/register');
            } catch (error) {
                console.error("Error al eliminar el perfil:", error);
                setMensaje("❌ Hubo un problema al eliminar tu cuenta.");
            }
        }
    };

    return (
        <div className="perfil-container">
            <h2>Perfil de Usuario</h2>
            <form onSubmit={handleUpdate}>
                <label>Nombre</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />

                <label>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label>Rol</label>
                <input type="text" value={rol} disabled />

                <div className="perfil-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? "Guardando..." : "Actualizar Perfil"}
                    </button>
                    <button type="button" onClick={handleDelete} className="delete-btn">
                        Eliminar Cuenta
                    </button>
                </div>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
    );
}
