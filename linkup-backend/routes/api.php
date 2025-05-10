<?php

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

    // Rutas de Perfil
    Route::get('/usuario', [AuthController::class, 'getUser']);
    Route::put('/usuario', [AuthController::class, 'updateProfile']);
    Route::delete('/usuario', [AuthController::class, 'deleteAccount']);

    // Rutas de Empresas
    Route::get('/empresas', [EmpresaController::class, 'index']);
    Route::post('/empresas', [EmpresaController::class, 'store']);
    Route::get('/empresas/{empresa}', [EmpresaController::class, 'show']);
    Route::put('/empresas/{empresa}', [EmpresaController::class, 'update']);
    Route::delete('/empresas/{empresa}', [EmpresaController::class, 'destroy']);

    // Rutas de Servicios
    Route::get('/servicios', [ServicioController::class, 'index']);
    Route::get('/empresas/{empresa}/servicios', [ServicioController::class, 'show']);
    Route::post('/servicios', [ServicioController::class, 'store']);
    Route::put('/servicios/{servicio}', [ServicioController::class, 'update']);
    Route::delete('/servicios/{servicio}', [ServicioController::class, 'destroy']);

    // Rutas de Citas
    Route::get('/citas', [CitaController::class, 'index']);
    Route::post('/citas', [CitaController::class, 'store']);
    Route::put('/citas/{cita}', [CitaController::class, 'update']);
    Route::delete('/citas/{cita}', [CitaController::class, 'destroy']);

    // Rutas de Reseñas
    Route::get('/reseñas', [ReseñaController::class, 'index']);
    Route::post('/reseñas', [ReseñaController::class, 'store']);
});
