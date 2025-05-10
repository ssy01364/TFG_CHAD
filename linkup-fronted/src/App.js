import { useState, useEffect } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import EmpresaForm from './EmpresaForm';
import ServicioForm from './ServicioForm';
import EmpresasPublicas from './EmpresasPublicas';
import CitaForm from './CitaForm';
import MisCitas from './MisCitas';
import PanelEmpresa from './PanelEmpresa';
import Perfil from './Perfil';
import api from './api';

function App() {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);

  const onLogin = (token, usuario) => {
    setToken(token);
    setUsuario(usuario);
  };

  const logout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setToken(null);
      setUsuario(null);
      setNotificaciones([]);
    } catch {
      alert('Error al cerrar sesión');
    }
  };

  const obtenerNotificaciones = async () => {
    try {
      const res = await api.get('/citas', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (usuario?.rol === 'empresa') {
        const pendientes = res.data.filter(c => c.estado === 'pendiente');
        if (pendientes.length > 0) {
          setNotificaciones([`🔴 Tienes ${pendientes.length} cita(s) pendiente(s)`]);
        }
      }

      if (usuario?.rol === 'cliente') {
        const gestionadas = res.data.filter(c => c.estado !== 'pendiente');
        if (gestionadas.length > 0) {
          setNotificaciones([`🔔 Hay ${gestionadas.length} actualización(es) en tus citas`]);
        }
      }
    } catch (err) {
      console.error('Error al obtener notificaciones');
    }
  };

  useEffect(() => {
    if (token && usuario) {
      obtenerNotificaciones();
    }
  }, [token, usuario]);

  return (
    <div>
      <h1>LinkUp</h1>

      {notificaciones.length > 0 && (
        <div style={{ background: '#fffae6', padding: '10px', border: '1px solid orange' }}>
          {notificaciones.map((n, i) => (
            <p key={i}>{n}</p>
          ))}
        </div>
      )}

      {!token ? (
        <>
          <RegisterForm setToken={onLogin} />
          <LoginForm setToken={onLogin} />
          <EmpresasPublicas />
        </>
      ) : (
        <>
          <h2>Bienvenido</h2>
          <button onClick={logout}>Cerrar sesión</button>
          <Perfil token={token} setUsuario={setUsuario} />

          {usuario?.rol === 'empresa' && (
            <>
              <PanelEmpresa token={token} />
              <EmpresaForm token={token} />
              <ServicioForm token={token} />
              <MisCitas token={token} usuario={usuario} />
            </>
          )}

          {usuario?.rol === 'cliente' && (
            <>
              <EmpresasPublicas />
              <CitaForm token={token} />
              <MisCitas token={token} usuario={usuario} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
