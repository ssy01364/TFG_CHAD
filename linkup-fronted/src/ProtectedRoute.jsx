// src/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// Componente de Protección de Rutas
export default function ProtectedRoute({ role }) {
    const { user } = useContext(AuthContext);

    // Verificar si el usuario está autenticado
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Verificar si el usuario tiene el rol adecuado
    if (role && user.rol !== role) {
        return <Navigate to="/" replace />;
    }

    // Permitir acceso si cumple los requisitos
    return <Outlet />;
}
