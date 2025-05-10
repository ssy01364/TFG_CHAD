import { useEffect, useState } from 'react';
import api from './api';

export default function MisCitas({ token, usuario }) {
  const [citas, setCitas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const fetchCitas = async () => {
    try {
      const res = await api.get('/citas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCitas(res.data);
    } catch (err) {
      console.error('Error al cargar citas');
    }
  };

  useEffect(() => {
    if (token) fetchCitas();
  }, [token]);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await api.put(`/citas/${id}/estado`, { estado: nuevoEstado }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCitas();
    } catch (err) {
      console.error('Error al cambiar estado');
    }
  };

  const cancelarCita = async (id) => {
    try {
      await api.delete(`/citas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCitas();
    } catch (err) {
      console.error('Error al cancelar cita');
    }
  };

  const citasFiltradas = citas.filter(cita =>
    filtroEstado === 'todas' ? true : cita.estado === filtroEstado
  );

  return (
    <div>
      <h3>Mis Citas</h3>

      <label>Filtrar por estado: </label>
      <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
        <option value="todas">Todas</option>
        <option value="pendiente">Pendientes</option>
        <option value="aceptada">Aceptadas</option>
        <option value="rechazada">Rechazadas</option>
      </select>

      {citasFiltradas.length === 0 ? (
        <p>No hay citas para mostrar.</p>
      ) : (
        <ul>
          {citasFiltradas.map((cita) => (
            <li key={cita.id}>
              <strong>{cita.servicio?.nombre}</strong> - {cita.fecha_cita}
              <br />
              Estado: <strong>{cita.estado}</strong>
              <br />
              {cita.mensaje && <em>Mensaje: {cita.mensaje}</em>}
              {usuario?.rol === 'empresa' && cita.estado === 'pendiente' && (
                <>
                  <br />
                  <button onClick={() => cambiarEstado(cita.id, 'aceptada')}>Aceptar</button>
                  <button onClick={() => cambiarEstado(cita.id, 'rechazada')}>Rechazar</button>
                </>
              )}
              {usuario?.rol === 'cliente' && cita.estado === 'pendiente' && (
                <>
                  <br />
                  <button onClick={() => cancelarCita(cita.id)}>Cancelar cita</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
