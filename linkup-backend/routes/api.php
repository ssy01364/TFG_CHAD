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

// Rutas protegidas por autenticación (requieren token)
Route::middleware('auth:sanctum')->group(function () {
    // Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas de Perfil del Usuario
    Route::get('/usuario', [AuthController::class, 'getUser']);
    Route::put('/usuario', [AuthController::class, 'updateProfile']);
    Route::delete('/usuario', [AuthController::class, 'deleteAccount']);

    // Rutas de Empresas (Solo empresas)
    Route::get('/empresas', [EmpresaController::class, 'index']); // Público
    Route::post('/empresas', [EmpresaController::class, 'store']); // Crear empresa (Solo empresa)
    Route::get('/empresas/{empresa}', [EmpresaController::class, 'show']); // Ver empresa y servicios
    Route::put('/empresas/{empresa}', [EmpresaController::class, 'update']); // Actualizar empresa
    Route::delete('/empresas/{empresa}', [EmpresaController::class, 'destroy']); // Eliminar empresa

    // Rutas de Servicios (Solo empresas)
    Route::get('/empresas/{empresa}/servicios', [ServicioController::class, 'show']); // Ver servicios de una empresa
    Route::post('/servicios', [ServicioController::class, 'store']); // Crear servicio
    Route::put('/servicios/{servicio}', [ServicioController::class, 'update']); // Actualizar servicio
    Route::delete('/servicios/{servicio}', [ServicioController::class, 'destroy']); // Eliminar servicio

    // Rutas de Citas (Clientes y Empresas)
    Route::get('/citas', [CitaController::class, 'index']); // Ver citas (Clientes y Empresas)
    Route::post('/citas', [CitaController::class, 'store']); // Crear cita (Clientes)
    Route::put('/citas/{cita}', [CitaController::class, 'update']); // Actualizar estado de cita (Empresas)
    Route::delete('/citas/{cita}', [CitaController::class, 'destroy']); // Cancelar cita (Clientes)

    // Rutas de Reseñas (Clientes)
    Route::get('/reseñas', [ReseñaController::class, 'index']); // Ver reseñas (Clientes y Empresas)
    Route::post('/reseñas', [ReseñaController::class, 'store']); // Crear reseña (Clientes)
});
