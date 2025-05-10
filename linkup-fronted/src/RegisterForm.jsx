import { useState } from 'react';
import api from './api';

export default function RegisterForm({ setToken }) {
  const [data, setData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'cliente'
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', data);
      setToken(res.data.token, res.data.usuario); // <-- igual que en login
    } catch (err) {
      alert('Error: ' + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <select name="rol" onChange={handleChange}>
        <option value="cliente">Cliente</option>
        <option value="empresa">Empresa</option>
      </select>
      <button type="submit">Registrarse</button>
    </form>
  );
}
