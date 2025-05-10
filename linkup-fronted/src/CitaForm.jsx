import { useEffect, useState } from 'react';
import api from './api';

export default function CitaForm({ token }) {
  const [empresas, setEmpresas] = useState([]);
  const [empresaId, setEmpresaId] = useState('');
  const [servicios, setServicios] = useState([]);
  const [servicioId, setServicioId] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [fechasOcupadas, setFechasOcupadas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await api.get('/empresas');
        setEmpresas(res.data);
      } catch (err) {
        console.error('Error al cargar empresas');
      }
    };

    fetchEmpresas();
  }, []);

  const handleEmpresaChange = async (e) => {
    const id = e.target.value;
    setEmpresaId(id);
    setServicioId('');
    setServicios([]);
    setFechasOcupadas([]);

    try {
      const [servRes, fechasRes] = await Promise.all([
        api.get(`/empresas/${id}/servicios`),
        api.get(`/empresa/${id}/fechas-ocupadas`)
      ]);
      setServicios(servRes.data);
      setFechasOcupadas(fechasRes.data);
    } catch (err) {
      console.error('Error al cargar datos de empresa');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/citas', {
        empresa_id: empresaId,
        servicio_id: servicioId,
        fecha_cita: fecha,
        mensaje: mensaje
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMensaje('Cita creada correctamente.');
      setEmpresaId('');
      setServicioId('');
      setFecha('');
      setMensaje('');
    } catch (err) {
      setMensaje('Error al crear cita.');
    }
  };

  const isFechaOcupada = (f) => fechasOcupadas.includes(f);

  return (
    <div>
      <h3>Solicitar cita</h3>
      <form onSubmit={handleSubmit}>
        <select value={empresaId} onChange={handleEmpresaChange}>
          <option value="">Selecciona una empresa</option>
          {empresas.map(e => (
            <option key={e.id} value={e.id}>
              {e.usuario?.nombre} ({e.sector})
            </option>
          ))}
        </select>

        <select value={servicioId} onChange={(e) => setServicioId(e.target.value)} disabled={!servicios.length}>
          <option value="">Selecciona un servicio</option>
          {servicios.map(s => (
            <option key={s.id} value={s.id}>
              {s.nombre} - {s.precio}€
            </option>
          ))}
        </select>

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          list="fechas-bloqueadas"
        />

        <datalist id="fechas-bloqueadas">
          {fechasOcupadas.map((f, i) => (
            <option key={i} value={f} disabled />
          ))}
        </datalist>

        <textarea
          placeholder="Mensaje (opcional)"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <button type="submit">Solicitar cita</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
