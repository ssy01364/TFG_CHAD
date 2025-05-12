// src/EmpresasPublicas.jsx
import React, { useState, useEffect } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

export default function EmpresasPublicas() {
    const [empresas, setEmpresas] = useState([]);
    const [search, setSearch] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadEmpresas();
    }, []);

    const loadEmpresas = async () => {
        try {
            const res = await api.get('/empresas');
            setEmpresas(res.data);
        } catch (error) {
            console.error("Error al cargar empresas:", error);
            setMensaje("❌ Error al cargar las empresas. Intenta nuevamente.");
        }
    };

    const filteredEmpresas = empresas.filter(empresa =>
        empresa?.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        empresa?.sector?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="empresas-publicas">
            <h2>Empresas Disponibles</h2>
            <input
                type="text"
                placeholder="Buscar por nombre o sector"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            {mensaje && <p className="mensaje error">{mensaje}</p>}

            <ul className="empresas-lista">
                {filteredEmpresas.length > 0 ? (
                    filteredEmpresas.map((empresa) => (
                        <li key={empresa.id} className="empresa-item">
                            <h3>{empresa.nombre}</h3>
                            <p><strong>Sector:</strong> {empresa.sector}</p>
                            <p><strong>Descripción:</strong> {empresa.descripcion || "Sin descripción"}</p>
                        </li>
                    ))
                ) : (
                    <p>No se encontraron empresas.</p>
                )}
            </ul>
        </div>
    );
}
