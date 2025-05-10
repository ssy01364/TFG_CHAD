// src/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">MiAplicación</Link>
                <ul className="navbar-links">
                    {/* Opciones Comunes */}
                    <li><Link to="/empresas">Empresas</Link></li>
                    
                    {/* Opciones para Clientes */}
                    {user && user.rol === 'cliente' && (
                        <>
                            <li><Link to="/perfil">Perfil</Link></li>
                            <li><Link to="/mis-citas">Mis Citas</Link></li>
                            <li><Link to="/mis-reseñas">Mis Reseñas</Link></li>
                        </>
                    )}

                    {/* Opciones para Empresas */}
                    {user && user.rol === 'empresa' && (
                        <>
                            <li><Link to="/panel-empresa">Panel de Empresa</Link></li>
                            <li><Link to="/empresa-form">Mis Servicios</Link></li>
                            <li><Link to="/reseñas-empresa">Reseñas</Link></li>
                        </>
                    )}

                    {/* Opciones para Usuarios No Autenticados */}
                    {!user && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Registro</Link></li>
                        </>
                    )}

                    {/* Botón de Cerrar Sesión (Solo autenticados) */}
                    {user && (
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
