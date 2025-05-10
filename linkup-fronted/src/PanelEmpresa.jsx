import React, { useState, useEffect } from 'react';
import api from './api';

export default function PanelEmpresa({ token }) {
  const [empresa, setEmpresa] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [citas, setCitas] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalServicios: 0,
    citasPendientes: 0,
    citasAceptadas: 0,
    citasRechazadas: 0
  });

  useEffect(() => {
    if (token) {
      cargarEmpresa();
      cargarServicios();
      cargarCitas();
      cargarEstadisticas();
    }
  }, [token]);

  const cargarEmpresa = async () => {
    const res = await api.get('/empresa', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEmpresa(res.data);
  };

  const cargarServicios = async () => {
    const res = await api.get('/servicios', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setServicios(res.data);
  };

  const cargarCitas = async () => {
    const res = await api.get('/citas', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCitas(res.data);
  };

  const cargarEstadisticas = async () => {
    const res = await api.get('/empresa/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEstadisticas(res.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Panel de Empresa</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Estadísticas</h3>
          <p>Servicios registrados: {estadisticas.totalServicios}</p>
          <p>Citas pendientes: {estadisticas.citasPendientes}</p>
          <p>Citas aceptadas: {estadisticas.citasAceptadas}</p>
          <p>Citas rechazadas: {estadisticas.citasRechazadas}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Servicios</h3>
          <ul>
            {servicios.map((s) => (
              <li key={s.id}>{s.nombre} - {s.precio}€</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Citas</h3>
        <ul>
          {citas.map((c) => (
            <li key={c.id}>{c.fecha_cita} - {c.estado}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
