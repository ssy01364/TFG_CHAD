// src/CalendarioEmpresa.jsx
import React, { useState, useEffect, useContext } from 'react';
import api from './api';
import { AuthContext } from './AuthContext';

export default function CalendarioEmpresa({ token }) {
    const { user } = useContext(AuthContext);
    const [citas, setCitas] = useState([]);
    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroServicio, setFiltroServicio] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (user && user.rol === 'empresa') {
            cargarCitas();
        }
    }, [user]);

    const cargarCitas = async () => {
        try {
            const res = await api.get('/citas', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCitas(res.data);
        } catch (err) {
            setMensaje('Error al cargar las citas.');
        }
    };

    const filtrarCitas = () => {
        return citas.filter((cita) => {
            return (
                (!filtroFecha || cita.fecha_cita.includes(filtroFecha)) &&
                (!filtroServicio || cita.servicio?.nombre.includes(filtroServicio))
            );
        });
    };

    const handleActualizarEstado = async (id, estado) => {
        try {
            await api.put(`/citas/${id}`, { estado }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            cargarCitas();
            setMensaje('Cita actualizada correctamente.');
        } catch (err) {
            setMensaje('Error al actualizar la cita.');
        }
    };

    return (
        <div className="calendario-empresa">
            <h2>Calendario de Citas</h2>
            <div className="filtros">
                <input 
                    type="date" 
                    value={filtroFecha} 
                    onChange={(e) => setFiltroFecha(e.target.value)} 
                    placeholder="Filtrar por fecha" 
                />
                <input 
                    type="text" 
                    value={filtroServicio} 
                    onChange={(e) => setFiltroServicio(e.target.value)} 
                    placeholder="Filtrar por servicio" 
                />
            </div>

            <ul className="citas-lista">
                {filtrarCitas().length > 0 ? (
                    filtrarCitas().map((cita) => (
                        <li key={cita.id} className="cita-item">
                            <strong>Cliente:</strong> {cita.cliente?.nombre || 'Anónimo'} <br />
                            <strong>Servicio:</strong> {cita.servicio?.nombre} <br />
                            <strong>Fecha:</strong> {cita.fecha_cita} <br />
                            <strong>Estado:</strong> {cita.estado} <br />
                            <button 
                                onClick={() => handleActualizarEstado(cita.id, 'aceptada')} 
                                className="aceptar-btn">
                                Aceptar
                            </button>
                            <button 
                                onClick={() => handleActualizarEstado(cita.id, 'rechazada')} 
                                className="rechazar-btn">
                                Rechazar
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No tienes citas registradas.</p>
                )}
            </ul>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
