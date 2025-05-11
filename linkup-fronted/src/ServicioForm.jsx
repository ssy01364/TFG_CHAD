// src/ServicioForm.jsx
import { useState, useEffect } from 'react';
import api from './api';
import './ServicioForm.css'; // Asegúrate de tener este archivo de CSS

export default function ServicioForm({ token }) {
  const [servicio, setServicio] = useState({ nombre: '', descripcion: '', precio: '' });
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setMensaje('❌ Error al cargar servicios');
    }
  };

  const handleChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    try {
      if (editando) {
        await api.put(`/servicios/${editando}`, servicio, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setMensaje('✅ Servicio actualizado correctamente.');
      } else {
        await api.post('/servicios', servicio, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setMensaje('✅ Servicio guardado correctamente.');
      }

      setServicio({ nombre: '', descripcion: '', precio: '' });
      setEditando(null);
      cargarServicios();
    } catch (err) {
      setMensaje('❌ Error al guardar el servicio.');
    } finally {
      setLoading(false);
    }
  };

  const editarServicio = (s) => {
    setServicio({ nombre: s.nombre, descripcion: s.descripcion, precio: s.precio });
    setEditando(s.id);
  };

  const cancelarEdicion = () => {
    setServicio({ nombre: '', descripcion: '', precio: '' });
    setEditando(null);
  };

  return (
    <div className="servicio-form-container">
      <h3>{editando ? "Editar Servicio" : "Añadir Servicio"}</h3>
      <form onSubmit={handleSubmit} className="servicio-form">
        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={servicio.nombre} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="descripcion" 
          placeholder="Descripción" 
          value={servicio.descripcion} 
          onChange={handleChange} 
        />
        <input 
          type="number" 
          name="precio" 
          placeholder="Precio" 
          value={servicio.precio} 
          onChange={handleChange} 
          required 
        />
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : editando ? "Actualizar" : "Guardar"}
          </button>
          {editando && (
            <button type="button" onClick={cancelarEdicion} className="cancel-btn">
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      {mensaje && <p className={`mensaje ${mensaje.includes("✅") ? "success" : "error"}`}>{mensaje}</p>}

      <h4>Mis servicios</h4>
      <ul className="servicios-lista">
        {servicios.length > 0 ? (
          servicios.map((s) => (
            <li key={s.id} className="servicio-item">
              <strong>{s.nombre}</strong> - {s.precio}€
              <p>{s.descripcion}</p>
              <button onClick={() => editarServicio(s)}>Editar</button>
            </li>
          ))
        ) : (
          <p>No tienes servicios registrados.</p>
        )}
      </ul>
    </div>
  );
}
