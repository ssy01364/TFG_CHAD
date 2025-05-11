<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\ReseñaController;

// ✅ Rutas de Autenticación (Públicas)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Rutas Protegidas (Requieren Autenticación)
Route::middleware('auth:sanctum')->group(function () {
    
    // ✅ Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    // ✅ Perfil del Usuario (Clientes y Empresas)
    Route::get('/usuario', [AuthController::class, 'getUser']);
    Route::put('/usuario', [AuthController::class, 'updateProfile']);
    Route::delete('/usuario', [AuthController::class, 'deleteAccount']);

    // ✅ Rutas Protegidas para Empresas
    Route::middleware('role:empresa')->group(function () {
        // Gestión de Empresas
        Route::get('/empresas', [EmpresaController::class, 'index']);
        Route::post('/empresas', [EmpresaController::class, 'store']);
        Route::get('/empresas/{empresa}', [EmpresaController::class, 'show']);
        Route::put('/empresas/{empresa}', [EmpresaController::class, 'update']);
        Route::delete('/empresas/{empresa}', [EmpresaController::class, 'destroy']);

        // Gestión de Servicios (solo para la empresa autenticada)
        Route::get('/empresas/{empresa}/servicios', [ServicioController::class, 'index']);
        Route::post('/servicios', [ServicioController::class, 'store']);
        Route::put('/servicios/{servicio}', [ServicioController::class, 'update']);
        Route::delete('/servicios/{servicio}', [ServicioController::class, 'destroy']);
    });

    // ✅ Rutas de Citas (Clientes y Empresas)
    Route::get('/citas', [CitaController::class, 'index']);
    Route::post('/citas', [CitaController::class, 'store']);
    Route::put('/citas/{cita}', [CitaController::class, 'update']);
    Route::delete('/citas/{cita}', [CitaController::class, 'destroy']);

    // ✅ Rutas de Reseñas (Clientes)
    Route::get('/reseñas', [ReseñaController::class, 'index']);
    Route::post('/reseñas', [ReseñaController::class, 'store']);
});
