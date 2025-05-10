<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\ReseñaController;
use App\Http\Controllers\ServicioController;

// Rutas de Autenticación
Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('auth.logout');

// Rutas Públicas
Route::get('/empresas', [EmpresaController::class, 'listado'])->name('empresas.listado');
Route::get('/empresas/{id}/servicios', [EmpresaController::class, 'servicios'])->name('empresas.servicios');
Route::get('/empresas/{id}/reseñas', [ReseñaController::class, 'verReseñas'])->name('empresas.reseñas');

// Rutas Protegidas (solo usuarios autenticados)
Route::middleware('auth:sanctum')->group(function () {
    // Empresa
    Route::prefix('empresa')->group(function () {
        Route::post('/', [EmpresaController::class, 'store'])->name('empresa.store');
        Route::get('/', [EmpresaController::class, 'show'])->name('empresa.show');
        Route::get('/dashboard', [EmpresaController::class, 'dashboard'])->name('empresa.dashboard');
    });

    // Servicios
    Route::prefix('servicios')->group(function () {
        Route::get('/', [ServicioController::class, 'index'])->name('servicios.index');
        Route::post('/', [ServicioController::class, 'store'])->name('servicios.store');
    });

    // Citas
    Route::prefix('citas')->group(function () {
        Route::post('/', [CitaController::class, 'store'])->name('citas.store');
        Route::get('/', [CitaController::class, 'index'])->name('citas.index');
        Route::put('/{id}/estado', [CitaController::class, 'cambiarEstado'])->name('citas.estado');
        Route::delete('/{id}', [CitaController::class, 'cancelar'])->name('citas.cancelar');
        Route::get('/{id}/fechas-ocupadas', [CitaController::class, 'fechasOcupadas'])->name('citas.fechas_ocupadas');
    });

    // Reseñas
    Route::prefix('reseñas')->group(function () {
        Route::post('/', [ReseñaController::class, 'store'])->name('reseñas.store');
        Route::get('/mis-reseñas', [ReseñaController::class, 'misReseñas'])->name('reseñas.mis');
    });

    // Perfil
    Route::get('/perfil', function (Request $request) {
        return $request->user();
    })->name('perfil.show');
    
    Route::put('/perfil', [AuthController::class, 'actualizarPerfil'])->name('perfil.update');
});
