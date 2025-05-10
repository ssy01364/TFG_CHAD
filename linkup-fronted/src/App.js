// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import EmpresasPublicas from './EmpresasPublicas';
import PanelEmpresa from './PanelEmpresa';
import Perfil from './Perfil';
import MisCitas from './MisCitas';
import ReseñasUsuario from './ReseñasUsuario';
import ReseñasEmpresa from './ReseñasEmpresa';
import CitaForm from './CitaForm';
import Navbar from './Navbar';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/empresas" element={<EmpresasPublicas />} />
                    <Route path="/panel-empresa" element={<PanelEmpresa />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/mis-citas" element={<MisCitas />} />
                    <Route path="/mis-reseñas" element={<ReseñasUsuario />} />
                    <Route path="/reseñas-empresa" element={<ReseñasEmpresa />} />
                    <Route path="/cita-form" element={<CitaForm />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
