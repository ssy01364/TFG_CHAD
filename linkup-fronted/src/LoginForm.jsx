import { useState } from 'react';
import api from './api';

export default function LoginForm({ setToken }) {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', data);
      setToken(res.data.token, res.data.usuario); // <-- pasamos token y usuario
    } catch (err) {
      alert('Login incorrecto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
