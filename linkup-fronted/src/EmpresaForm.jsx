// src/EmpresaForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function EmpresaForm() {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [sector, setSector] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user && user.rol === 'empresa') {
            cargarEmpresa();
        }
    }, [user]);

    const cargarEmpresa = async () => {
        try {
            const res = await api.get(`/empresas/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data) {
                const empresa = res.data;
                setNombre(empresa.nombre);
                setSector(empresa.sector);
                setDescripcion(empresa.descripcion);
                setUbicacion(empresa.ubicacion);
                setTelefono(empresa.telefono);
                setIsEditing(true);
            }
        } catch (err) {
            setMensaje("❌ Error al cargar la empresa.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/empresas/${user.id}`, {
                    nombre,
                    sector,
                    descripcion,
                    ubicacion,
                    telefono
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMensaje("✅ Empresa actualizada correctamente.");
            } else {
                await api.post('/empresas', {
                    nombre,
                    sector,
                    descripcion,
                    ubicacion,
                    telefono,
                    usuario_id: user.id
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMensaje("✅ Empresa registrada correctamente.");
                navigate('/panel-empresa');
            }
        } catch (err) {
            setMensaje("❌ Error al registrar la empresa.");
        }
    };

    return (
        <div className="empresa-form">
            <h2>{isEditing ? "Editar Empresa" : "Registrar Empresa"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre de la Empresa</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />

                <label>Sector</label>
                <input 
                    type="text" 
                    value={sector} 
                    onChange={(e) => setSector(e.target.value)} 
                    required 
                />

                <label>Descripción</label>
                <textarea 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                />

                <label>Ubicación</label>
                <input 
                    type="text" 
                    value={ubicacion} 
                    onChange={(e) => setUbicacion(e.target.value)} 
                />

                <label>Teléfono</label>
                <input 
                    type="text" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                />

                <button type="submit">
                    {isEditing ? "Actualizar Empresa" : "Registrar Empresa"}
                </button>
            </form>
            {mensaje && <p className={mensaje.includes("❌") ? "mensaje error" : "mensaje success"}>{mensaje}</p>}
        </div>
    );
}
