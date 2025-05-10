import { useState, useEffect } from 'react';
import api from './api';

export default function ServicioForm({ token }) {
  const [servicio, setServicio] = useState({ nombre: '', descripcion: '', precio: '' });
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    if (token) cargarServicios();
  }, [token]);

  const cargarServicios = async () => {
    try {
      const res = await api.get('/servicios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServicios(res.data);
    } catch (err) {
      setMensaje('Error al cargar servicios');
    }
  };

  const handleChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await api.put(`/servicios/${editando}`, servicio, { headers: { Authorization: `Bearer ${token}` } });
        setMensaje('Servicio actualizado correctamente.');
      } else {
        await api.post('/servicios', servicio, { headers: { Authorization: `Bearer ${token}` } });
        setMensaje('Servicio guardado correctamente.');
      }
      setServicio({ nombre: '', descripcion: '', precio: '' });
      setEditando(null);
      cargarServicios();
    } catch (err) {
      setMensaje('Error al guardar el servicio.');
    }
  };

  const editarServicio = (s) => {
    setServicio({ nombre: s.nombre, descripcion: s.descripcion, precio: s.precio });
    setEditando(s.id);
  };

  return (
    <div>
      <h3>{editando ? "Editar Servicio" : "Añadir Servicio"}</h3>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={servicio.nombre} onChange={handleChange} />
        <input name="descripcion" placeholder="Descripción" value={servicio.descripcion} onChange={handleChange} />
        <input name="precio" placeholder="Precio" value={servicio.precio} onChange={handleChange} />
        <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h4>Mis servicios</h4>
      <ul>
        {servicios.map((s) => (
          <li key={s.id}>
            {s.nombre} - {s.precio}€
            <br />
            <small>{s.descripcion}</small>
            <button onClick={() => editarServicio(s)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
