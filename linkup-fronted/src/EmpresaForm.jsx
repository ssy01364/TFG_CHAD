import { useState } from 'react';
import api from './api';

function EmpresaForm({ token }) {
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const guardarEmpresa = async () => {
    try {
      const response = await api.post(
        '/empresa',
        { nombre, sector, descripcion },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMensaje('Empresa guardada correctamente');
    } catch (error) {
      setMensaje('Error al guardar la empresa');
    }
  };

  return (
    <div>
      <h3>Registrar Empresa</h3>
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="text" placeholder="Sector" value={sector} onChange={e => setSector(e.target.value)} />
      <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <button onClick={guardarEmpresa}>Guardar empresa</button>
      <p>{mensaje}</p>
    </div>
  );
}

export default EmpresaForm;
