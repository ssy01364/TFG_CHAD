// src/EmpresaForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from './api';
import { useNavigate } from 'react-router-dom';

export default function EmpresaForm() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [sector, setSector] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user && user.rol === 'empresa') {
            loadEmpresa();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const loadEmpresa = async () => {
        try {
            const res = await axios.get(`/empresas/${user.empresa_id}`);
            const empresa = res.data;
            if (empresa) {
                setNombre(empresa.nombre);
                setSector(empresa.sector);
                setDescripcion(empresa.descripcion);
                setUbicacion(empresa.ubicacion);
                setTelefono(empresa.telefono);
                setIsEditing(true);
            }
        } catch (error) {
            console.error("Error al cargar la empresa:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/empresas/${user.empresa_id}`, {
                    nombre,
                    sector,
                    descripcion,
                    ubicacion,
                    telefono
                });
                alert("Empresa actualizada correctamente.");
            } else {
                await axios.post('/empresas', {
                    usuario_id: user.id,
                    nombre,
                    sector,
                    descripcion,
                    ubicacion,
                    telefono
                });
                alert("Empresa registrada correctamente.");
            }
            navigate('/panel-empresa');
        } catch (error) {
            console.error("Error al guardar la empresa:", error);
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
        </div>
    );
}
