import { useState, useEffect } from 'react';
import api from './api';

export default function Perfil({ token, setUsuario }) {
  const [datos, setDatos] = useState({
    nombre: '',
    password: '',
    password_confirmation: ''
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await api.get('/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDatos({ ...datos, nombre: res.data.nombre });
      } catch {
        setMensaje('Error al cargar perfil');
      }
    };
    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/perfil', datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje(res.data.message);
      setUsuario(res.data.usuario);
      setDatos({ ...datos, password: '', password_confirmation: '' });
    } catch {
      setMensaje('Error al actualizar perfil');
    }
  };

  return (
    <div>
      <h3>Mi perfil</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="password"
          type="password"
          value={datos.password}
          onChange={handleChange}
          placeholder="Nueva contraseña (opcional)"
        />
        <input
          name="password_confirmation"
          type="password"
          value={datos.password_confirmation}
          onChange={handleChange}
          placeholder="Confirmar contraseña"
        />
        <button type="submit">Actualizar perfil</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
