<?php

return [

    /*
    |--------------------------------------------------------------------------
    | CORS Configuration
    |--------------------------------------------------------------------------
    |
    | Esta configuración controla las políticas de CORS de tu aplicación.
    | Puedes ajustar los orígenes permitidos, métodos, encabezados y más.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Permitir todas las rutas de la API y CSRF de Sanctum

    'allowed_methods' => ['*'], // Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['*'], // Permitir todos los orígenes (Cambiar a 'http://localhost:3000' en producción)

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permitir todos los encabezados

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Habilitar credenciales (necesario para Sanctum)

];
