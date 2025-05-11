// src/PanelEmpresa.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from './api';
import { useNavigate } from 'react-router-dom';
import './styles/PanelEmpresa.css'; // Asegúrate de tener este archivo de CSS

export default function PanelEmpresa() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const [nombreServicio, setNombreServicio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [editingServicio, setEditingServicio] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && user.rol === 'empresa') {
            loadServicios();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const loadServicios = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/empresas/${user.empresa_id}/servicios`);
            setServicios(res.data.servicios || []);
        } catch (error) {
            console.error("Error al cargar servicios:", error);
            setMensaje("❌ Error al cargar los servicios.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setLoading(true);
        try {
            if (editingServicio) {
                await axios.put(`/servicios/${editingServicio.id}`, {
                    nombre: nombreServicio,
                    descripcion,
                    precio
                });
                setMensaje("✅ Servicio actualizado correctamente.");
            } else {
                await axios.post('/servicios', {
                    nombre: nombreServicio,
                    descripcion,
                    precio
                });
                setMensaje("✅ Servicio creado correctamente.");
            }

            resetForm();
            loadServicios();
        } catch (error) {
            console.error("Error al gestionar servicio:", error);
            setMensaje("❌ Hubo un problema al gestionar el servicio.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (servicio) => {
        setEditingServicio(servicio);
        setNombreServicio(servicio.nombre);
        setDescripcion(servicio.descripcion);
        setPrecio(servicio.precio);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
            try {
                await axios.delete(`/servicios/${id}`);
                setMensaje("✅ Servicio eliminado correctamente.");
                loadServicios();
            } catch (error) {
                console.error("Error al eliminar servicio:", error);
                setMensaje("❌ Error al eliminar el servicio.");
            }
        }
    };

    const resetForm = () => {
        setEditingServicio(null);
        setNombreServicio('');
        setDescripcion('');
        setPrecio('');
    };

    return (
        <div className="panel-empresa">
            <h2>Panel de Empresa</h2>
            <h3>Gestionar Servicios</h3>
            <form onSubmit={handleSubmit} className="servicio-form">
                <input
                    type="text"
                    placeholder="Nombre del servicio"
                    value={nombreServicio}
                    onChange={(e) => setNombreServicio(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? "Guardando..." : editingServicio ? "Actualizar Servicio" : "Agregar Servicio"}
                    </button>
                    {editingServicio && (
                        <button type="button" onClick={resetForm} className="cancel-btn">
                            Cancelar Edición
                        </button>
                    )}
                </div>
            </form>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <h3>Mis Servicios</h3>
            <ul className="servicios-lista">
                {servicios.length > 0 ? (
                    servicios.map((servicio) => (
                        <li key={servicio.id} className="servicio-item">
                            <strong>{servicio.nombre}</strong> - ${servicio.precio}
                            <p>{servicio.descripcion}</p>
                            <div className="servicio-actions">
                                <button onClick={() => handleEdit(servicio)}>Editar</button>
                                <button onClick={() => handleDelete(servicio.id)} className="delete-btn">
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No tienes servicios registrados.</p>
                )}
            </ul>
        </div>
    );
}
