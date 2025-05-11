<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Dominios Autenticados (Frontend)
    |--------------------------------------------------------------------------
    */
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:3000')),

    /*
    |--------------------------------------------------------------------------
    | Guardias de Autenticación
    |--------------------------------------------------------------------------
    */
    'guard' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Expiración de Tokens
    |--------------------------------------------------------------------------
    */
    'expiration' => null, // Los tokens no expiran automáticamente

    /*
    |--------------------------------------------------------------------------
    | Cookie de Sesión para Sanctum
    |--------------------------------------------------------------------------
    */
    'cookie' => 'linkup_session',
    'domain' => env('SESSION_DOMAIN', null),

    /*
    |--------------------------------------------------------------------------
    | Middleware de Protección de Rutas API
    |--------------------------------------------------------------------------
    */
    'middleware' => [
        'verify_csrf_token' => \App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => \App\Http\Middleware\EncryptCookies::class,
    ],

];
