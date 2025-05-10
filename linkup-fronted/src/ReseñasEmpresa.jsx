import { useEffect, useState } from 'react';
import api from './api';

export default function ReseñasEmpresa({ empresaId }) {
  const [reseñas, setReseñas] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/empresas/${empresaId}/reseñas`);
        setReseñas(res.data);
      } catch (err) {
        console.error('Error al cargar reseñas');
      }
    };
    if (empresaId) fetch();
  }, [empresaId]);

  if (reseñas.length === 0) return <p>Esta empresa aún no tiene reseñas.</p>;

  return (
    <div>
      <h4>Opiniones de clientes</h4>
      <ul>
        {reseñas.map((r) => (
          <li key={r.id}>
            <strong>{r.puntuacion} ⭐</strong> - {r.comentario}
            <br />
            <small>{r.cliente?.nombre}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
