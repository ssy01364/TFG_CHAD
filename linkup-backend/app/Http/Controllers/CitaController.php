<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CitaController extends Controller
{
    // Listar citas del usuario autenticado
    public function index()
    {
        $user = Auth::user();

        // Verificar si es cliente
        if ($user->rol === 'cliente') {
            return Cita::with('empresa', 'servicio')
                ->where('cliente_id', $user->id)
                ->get();
        }

        // Verificar si es empresa
        if ($user->rol === 'empresa') {
            return Cita::with('cliente', 'servicio')
                ->where('empresa_id', $user->empresa->id)
                ->get();
        }

        return response()->json(['message' => 'No tienes acceso a esta sección.'], 403);
    }

    // Crear nueva cita (solo para clientes)
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->rol !== 'cliente') {
            return response()->json(['message' => 'Solo los clientes pueden reservar citas.'], 403);
        }

        $request->validate([
            'empresa_id' => 'required|exists:empresas,id',
            'servicio_id' => 'required|exists:servicios,id',
            'fecha_cita' => 'required|date',
        ]);

        $cita = Cita::create([
            'cliente_id' => $user->id,
            'empresa_id' => $request->empresa_id,
            'servicio_id' => $request->servicio_id,
            'fecha_cita' => $request->fecha_cita,
            'estado' => 'pendiente',
        ]);

        return response()->json(['message' => 'Cita reservada correctamente.', 'cita' => $cita]);
    }

    // Actualizar estado de la cita (solo para empresa)
    public function update(Request $request, Cita $cita)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa' || $cita->empresa_id !== $user->empresa->id) {
            return response()->json(['message' => 'No tienes permiso para actualizar esta cita.'], 403);
        }

        $request->validate([
            'estado' => 'required|in:pendiente,aceptada,rechazada'
        ]);

        $cita->update([
            'estado' => $request->estado
        ]);

        return response()->json(['message' => 'Estado de la cita actualizado.', 'cita' => $cita]);
    }

    // Cancelar cita (solo para clientes)
    public function destroy(Cita $cita)
    {
        $user = Auth::user();
        if ($user->rol !== 'cliente' || $cita->cliente_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para cancelar esta cita.'], 403);
        }

        $cita->delete();
        return response()->json(['message' => 'Cita cancelada correctamente.']);
    }
}
