// src/ReseñasEmpresa.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from './api';
import { useNavigate } from 'react-router-dom';

export default function ReseñasEmpresa() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reseñas, setReseñas] = useState([]);

    useEffect(() => {
        if (user && user.rol === 'empresa') {
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

    return (
        <div className="reseñas-empresa">
            <h2>Opiniones de Clientes</h2>
            <ul className="reseñas-lista">
                {reseñas.length > 0 ? (
                    reseñas.map((reseña) => (
                        <li key={reseña.id} className="reseña-item">
                            <strong>Puntuación:</strong> {reseña.puntuacion} ⭐<br />
                            <strong>Comentario:</strong> {reseña.comentario} <br />
                            <small><strong>Cliente:</strong> {reseña.cliente ? reseña.cliente.nombre : 'Cliente anónimo'}</small>
                        </li>
                    ))
                ) : (
                    <p>No tienes reseñas aún.</p>
                )}
            </ul>
        </div>
    );
}
