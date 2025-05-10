import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from './api';
import exportCSV from './utils/exportCSV';

export default function CalendarioEmpresa({ token }) {
  const [citas, setCitas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  useEffect(() => {
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

    fetchCitas();
  }, []);

  const fechasConCitas = citas.map(c => c.fecha_cita);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const fechaStr = date.toISOString().split('T')[0];
      return fechasConCitas.includes(fechaStr) ? 'marcada' : null;
    }
  };

  const citasDelDia = citas.filter(c =>
    c.fecha_cita === fechaSeleccionada.toISOString().split('T')[0]
  );

  const exportarCSV = () => {
    const citasCSV = citas.map(c => ({
      Fecha: c.fecha_cita,
      Servicio: c.servicio?.nombre || '',
      Cliente_ID: c.cliente_id,
      Estado: c.estado
    }));
    exportCSV('citas_empresa', citasCSV);
  };

  return (
    <div>
      <h4>Calendario de citas</h4>
      <button onClick={exportarCSV}>Exportar citas en CSV</button>

      <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
        tileClassName={tileClassName}
      />

      <h5>Citas del {fechaSeleccionada.toISOString().split('T')[0]}</h5>
      {citasDelDia.length === 0 ? (
        <p>No hay citas.</p>
      ) : (
        <ul>
          {citasDelDia.map(c => (
            <li key={c.id}>
              {c.servicio?.nombre} - Cliente #{c.cliente_id} - Estado: {c.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
