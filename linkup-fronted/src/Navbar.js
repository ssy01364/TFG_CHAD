// src/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">LinkUp</Link>
                <ul className="navbar-links">
                    {user ? (
                        <>
                            {user.rol === 'empresa' ? (
                                <li><Link to="/panel-empresa">Panel Empresa</Link></li>
                            ) : (
                                <li><Link to="/empresas">Ver Empresas</Link></li>
                            )}
                            <li><Link to="/perfil">Perfil</Link></li>
                            <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Iniciar Sesión</Link></li>
                            <li><Link to="/register">Registrarse</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
