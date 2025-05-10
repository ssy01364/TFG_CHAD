import { useState, useEffect } from 'react';
import api from './api';

export default function ReseñaForm({ token }) {
  const [citasAceptadas, setCitasAceptadas] = useState([]);
  const [form, setForm] = useState({
    cita_id: '',
    puntuacion: 5,
    comentario: ''
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await api.get('/citas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const disponibles = res.data.filter(c => c.estado === 'aceptada');
        setCitasAceptadas(disponibles);
      } catch (err) {
        console.error('Error al cargar citas');
      }
    };
    fetchCitas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reseñas', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('¡Reseña enviada!');
      setForm({ cita_id: '', puntuacion: 5, comentario: '' });
    } catch (err) {
      setMensaje('Error al enviar reseña');
    }
  };

  return (
    <div>
      <h3>Valorar empresa</h3>
      <form onSubmit={handleSubmit}>
        <select name="cita_id" value={form.cita_id} onChange={handleChange}>
          <option value="">Selecciona una cita aceptada</option>
          {citasAceptadas.map(c => (
            <option key={c.id} value={c.id}>
              {c.servicio?.nombre} - {c.fecha_cita}
            </option>
          ))}
        </select>

        <select name="puntuacion" value={form.puntuacion} onChange={handleChange}>
          {[1,2,3,4,5].map(p => (
            <option key={p} value={p}>{p} ⭐</option>
          ))}
        </select>

        <textarea
          name="comentario"
          placeholder="Comentario"
          value={form.comentario}
          onChange={handleChange}
        />

        <button type="submit">Enviar reseña</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
