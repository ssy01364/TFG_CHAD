// src/ReseñasUsuario.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from './api';
import { useNavigate } from 'react-router-dom';

export default function ReseñasUsuario() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reseñas, setReseñas] = useState([]);
    const [citaId, setCitaId] = useState('');
    const [puntuacion, setPuntuacion] = useState(5);
    const [comentario, setComentario] = useState('');

    useEffect(() => {
        if (user && user.rol === 'cliente') {
            loadReseñas();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const loadReseñas = async () => {
        try {
            const res = await axios.get('/reseñas');
            setReseñas(res.data);
        } catch (error) {
            console.error("Error al cargar reseñas:", error);
        }
    };

    const agregarReseña = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/reseñas', {
                cita_id: citaId,
                puntuacion,
                comentario
            });
            setCitaId('');
            setPuntuacion(5);
            setComentario('');
            loadReseñas();
        } catch (error) {
            console.error("Error al agregar reseña:", error);
        }
    };

    return (
        <div className="reseñas-usuario">
            <h2>Mis Reseñas</h2>
            <form onSubmit={agregarReseña}>
                <label>Cita ID:</label>
                <input
                    type="text"
                    value={citaId}
                    onChange={(e) => setCitaId(e.target.value)}
                    placeholder="ID de la cita"
                    required
                />
                <label>Puntuación:</label>
                <input
                    type="number"
                    value={puntuacion}
                    min="1"
                    max="5"
                    onChange={(e) => setPuntuacion(e.target.value)}
                    required
                />
                <label>Comentario:</label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Deja tu comentario"
                />
                <button type="submit">Dejar Reseña</button>
            </form>

            <h3>Reseñas Anteriores</h3>
            <ul className="reseñas-lista">
                {reseñas.length > 0 ? (
                    reseñas.map((reseña) => (
                        <li key={reseña.id}>
                            <strong>Empresa:</strong> {reseña.empresa.nombre} <br />
                            <strong>Puntuación:</strong> {reseña.puntuacion} / 5 <br />
                            <strong>Comentario:</strong> {reseña.comentario} <br />
                        </li>
                    ))
                ) : (
                    <p>No has dejado ninguna reseña.</p>
                )}
            </ul>
        </div>
    );
}
