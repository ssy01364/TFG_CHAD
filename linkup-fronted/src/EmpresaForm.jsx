// src/EmpresaForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function EmpresaForm() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [sector, setSector] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user && user.rol === 'empresa') {
            cargarEmpresa();
        }
    }, [user]);

    const cargarEmpresa = async () => {
        try {
            const res = await api.get('/empresas', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.data.length > 0) {
                const empresa = res.data.find(e => e.usuario_id === user.id);
                if (empresa) {
                    setNombre(empresa.nombre);
                    setSector(empresa.sector);
                    setDescripcion(empresa.descripcion);
                    setUbicacion(empresa.ubicacion);
                    setTelefono(empresa.telefono);
                    setIsEditing(true);
                }
            }
        } catch (err) {
            console.error("Error al cargar la empresa:", err);
            setMensaje("Error al cargar la empresa.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje('');

        try {
            if (isEditing) {
                await api.put(`/empresas/${user.id}`, {
                    nombre,
                    sector,
                    descripcion,
                    ubicacion,
                    telefono
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setMensaje("Empresa actualizada correctamente.");
            } else {
                await api.post('/empresas', {
                    nombre,
                    sector,
                    descripcion,
                    ubicacion,
                    telefono,
                    usuario_id: user.id
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setMensaje("Empresa registrada correctamente.");
            }
            navigate('/panel-empresa');
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    setMensaje("No tienes permisos para realizar esta acción.");
                } else if (err.response.status === 400) {
                    setMensaje("Ya tienes una empresa registrada.");
                } else {
                    setMensaje("Error al guardar la empresa.");
                }
            } else {
                setMensaje("Error de conexión. Verifica tu red.");
            }
        } finally {
            setLoading(false);
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

                <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : isEditing ? "Actualizar Empresa" : "Registrar Empresa"}
                </button>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
    );
}
