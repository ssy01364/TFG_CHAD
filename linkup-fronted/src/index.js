// src/index.js (React + Vite)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Estilos Globales
import './App.css';    // Estilos Específicos de Componentes
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
