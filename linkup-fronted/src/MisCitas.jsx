// src/MisCitas.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from './api';
import { useNavigate } from 'react-router-dom';

export default function MisCitas() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        if (user && user.rol === 'cliente') {
            loadCitas();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const loadCitas = async () => {
        try {
            const res = await axios.get('/citas');
            const citasUsuario = res.data.filter(cita => cita.cliente_id === user.id);
            setCitas(citasUsuario);
        } catch (error) {
            console.error("Error al cargar citas:", error);
        }
    };

    return (
        <div className="mis-citas">
            <h2>Mis Citas</h2>
            <ul className="citas-lista">
                {citas.length > 0 ? (
                    citas.map((cita) => (
                        <li key={cita.id}>
                            <strong>Empresa:</strong> {cita.empresa.nombre} <br />
                            <strong>Servicio:</strong> {cita.servicio.nombre} <br />
                            <strong>Fecha:</strong> {cita.fecha_cita} <br />
                            <strong>Estado:</strong> {cita.estado} <br />
                        </li>
                    ))
                ) : (
                    <p>No tienes citas reservadas.</p>
                )}
            </ul>
        </div>
    );
}
