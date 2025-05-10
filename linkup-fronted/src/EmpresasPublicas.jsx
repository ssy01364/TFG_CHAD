import React, { useState, useEffect } from 'react';
import api from './api';

export default function EmpresasPublicas() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const cargarEmpresas = async () => {
    setLoading(true);
    try {
      const res = await api.get('/empresas');
      console.log('Empresas cargadas:', res.data);
      setEmpresas(res.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar empresas:', err);
      setError('No se pudieron cargar las empresas. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Empresas Disponibles</h2>

      {loading ? (
        <p>Cargando empresas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {empresas.length > 0 ? (
            empresas.map((empresa) => (
              <li key={empresa.id} className="mb-2">
                <h3 className="font-bold">{empresa.nombre}</h3>
                <p>{empresa.sector}</p>
                <p>{empresa.descripcion}</p>
              </li>
            ))
          ) : (
            <p>No hay empresas registradas.</p>
          )}
        </ul>
      )}
    </div>
  );
}
