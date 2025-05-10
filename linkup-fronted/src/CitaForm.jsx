// src/CitaForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from './api';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function CitaForm() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [empresas, setEmpresas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [empresaId, setEmpresaId] = useState(searchParams.get('empresa') || '');
    const [servicioId, setServicioId] = useState(searchParams.get('servicio') || '');
    const [fechaCita, setFechaCita] = useState('');

    useEffect(() => {
        loadEmpresas();
        if (empresaId) {
            loadServicios(empresaId);
        }
    }, [empresaId]);

    const loadEmpresas = async () => {
        try {
            const res = await axios.get('/empresas');
            setEmpresas(res.data);
        } catch (error) {
            console.error("Error al cargar empresas:", error);
        }
    };

    const loadServicios = async (id) => {
        try {
            const res = await axios.get(`/empresas/${id}`);
            setServicios(res.data.servicios);
        } catch (error) {
            console.error("Error al cargar servicios:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/citas', {
                empresa_id: empresaId,
                servicio_id: servicioId,
                fecha_cita: fechaCita
            });
            alert("Cita reservada correctamente.");
            navigate('/mis-citas');
        } catch (error) {
            console.error("Error al reservar cita:", error);
        }
    };

    return (
        <div className="cita-form">
            <h2>Reservar Cita</h2>
            <form onSubmit={handleSubmit}>
                <label>Empresa</label>
                <select value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} required>
                    <option value="">Seleccionar empresa</option>
                    {empresas.map((empresa) => (
                        <option key={empresa.id} value={empresa.id}>
                            {empresa.nombre}
                        </option>
                    ))}
                </select>

                <label>Servicio</label>
                <select value={servicioId} onChange={(e) => setServicioId(e.target.value)} required>
                    <option value="">Seleccionar servicio</option>
                    {servicios.map((servicio) => (
                        <option key={servicio.id} value={servicio.id}>
                            {servicio.nombre} - ${servicio.precio}
                        </option>
                    ))}
                </select>

                <label>Fecha de la Cita</label>
                <input
                    type="date"
                    value={fechaCita}
                    onChange={(e) => setFechaCita(e.target.value)}
                    required
                />

                <button type="submit">Reservar</button>
            </form>
        </div>
    );
}
