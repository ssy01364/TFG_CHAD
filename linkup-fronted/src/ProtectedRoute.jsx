// src/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// Componente de Protección de Rutas
export default function ProtectedRoute({ role, redirectTo = "/login" }) {
    const { user } = useContext(AuthContext);

    // Verificar si el usuario está autenticado
    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    // Verificar si el usuario tiene el rol adecuado (si se especifica)
    if (role) {
        const rolesPermitidos = Array.isArray(role) ? role : [role];
        if (!rolesPermitidos.includes(user.rol)) {
            return <Navigate to="/" replace />;
        }
    }

    // Permitir acceso si cumple los requisitos
    return <Outlet />;
}
