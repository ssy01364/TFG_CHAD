// src/EmpresasPublicas.jsx
import React, { useState, useEffect } from 'react';
import axios from './api';
import { useNavigate } from 'react-router-dom';
import './styles/EmpresasPublicas.css'; // Asegúrate de crear este archivo de CSS

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
            const res = await axios.get('/empresas');
            setEmpresas(res.data);
        } catch (error) {
            console.error("Error al cargar empresas:", error);
            setMensaje("Error al cargar las empresas. Intenta nuevamente.");
        }
    };

    const filteredEmpresas = empresas.filter(empresa =>
        empresa.nombre.toLowerCase().includes(search.toLowerCase()) ||
        empresa.sector.toLowerCase().includes(search.toLowerCase())
    );

    const reservarCita = (empresaId, servicioId) => {
        navigate(`/cita-form?empresa=${empresaId}&servicio=${servicioId}`);
    };

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

            {mensaje && <p className="error-message">{mensaje}</p>}

            <ul className="empresas-lista">
                {filteredEmpresas.length > 0 ? (
                    filteredEmpresas.map((empresa) => (
                        <li key={empresa.id} className="empresa-item">
                            <h3>{empresa.nombre}</h3>
                            <p><strong>Sector:</strong> {empresa.sector}</p>
                            <p><strong>Descripción:</strong> {empresa.descripcion || "Sin descripción"}</p>

                            <h4>Servicios Disponibles</h4>
                            <ul className="servicios-lista">
                                {empresa.servicios && empresa.servicios.length > 0 ? (
                                    empresa.servicios.map((servicio) => (
                                        <li key={servicio.id} className="servicio-item">
                                            <span><strong>{servicio.nombre}</strong> - ${servicio.precio}</span>
                                            <button 
                                                className="reservar-btn" 
                                                onClick={() => reservarCita(empresa.id, servicio.id)}>
                                                Reservar
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>Esta empresa aún no tiene servicios.</p>
                                )}
                            </ul>
                        </li>
                    ))
                ) : (
                    <p>No se encontraron empresas.</p>
                )}
            </ul>
        </div>
    );
}
