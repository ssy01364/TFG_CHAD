<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\ReseñaController;

// Rutas de Autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas por autenticación
Route::middleware('auth:sanctum')->group(function () {
    // Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas de Perfil del Usuario
    Route::get('/usuario', [AuthController::class, 'getUser']);
    Route::put('/usuario', [AuthController::class, 'updateProfile']);
    Route::delete('/usuario', [AuthController::class, 'deleteAccount']);

    // Rutas de Empresas (Solo empresas)
    Route::middleware('role:empresa')->group(function () {
        Route::get('/empresas', [EmpresaController::class, 'index']);
        Route::post('/empresas', [EmpresaController::class, 'store']);
        Route::get('/empresas/{empresa}', [EmpresaController::class, 'show']);
        Route::put('/empresas/{empresa}', [EmpresaController::class, 'update']);
        Route::delete('/empresas/{empresa}', [EmpresaController::class, 'destroy']);

        // Servicios de Empresas
        Route::get('/empresas/{empresa}/servicios', [ServicioController::class, 'show']);
        Route::post('/servicios', [ServicioController::class, 'store']);
        Route::put('/servicios/{servicio}', [ServicioController::class, 'update']);
        Route::delete('/servicios/{servicio}', [ServicioController::class, 'destroy']);
    });

    // Rutas de Citas (Clientes y Empresas)
    Route::middleware('role:cliente')->group(function () {
        Route::get('/citas', [CitaController::class, 'index']);
        Route::post('/citas', [CitaController::class, 'store']);
        Route::delete('/citas/{cita}', [CitaController::class, 'destroy']);
        
        // Reseñas (Solo Clientes)
        Route::get('/reseñas', [ReseñaController::class, 'index']);
        Route::post('/reseñas', [ReseñaController::class, 'store']);
    });

    // Rutas de Citas para Empresas
    Route::middleware('role:empresa')->group(function () {
        Route::put('/citas/{cita}', [CitaController::class, 'update']); // Aceptar/Rechazar cita
    });
});
