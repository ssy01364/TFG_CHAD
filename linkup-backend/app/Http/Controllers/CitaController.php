<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CitaController extends Controller
{
    // Listar citas (Clientes y Empresas)
    public function index()
    {
        $user = Auth::user();
        if ($user->rol === 'cliente') {
            return Cita::where('cliente_id', $user->id)->get();
        } else {
            return Cita::where('empresa_id', $user->id)->with('cliente', 'servicio')->get();
        }
    }

    // Crear una nueva cita (Clientes)
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->rol !== 'cliente') {
            return response()->json(['message' => 'Solo los clientes pueden reservar citas.'], 403);
        }

        $request->validate([
            'empresa_id' => 'required|exists:empresas,id',
            'servicio_id' => 'required|exists:servicios,id',
            'fecha_cita' => 'required|date'
        ]);

        $cita = Cita::create([
            'cliente_id' => $user->id,
            'empresa_id' => $request->empresa_id,
            'servicio_id' => $request->servicio_id,
            'fecha_cita' => $request->fecha_cita,
            'estado' => 'pendiente'
        ]);

        return response()->json(['message' => 'Cita reservada correctamente.', 'cita' => $cita]);
    }

    // Actualizar estado de la cita (Empresas)
    public function update(Request $request, Cita $cita)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa' || $cita->empresa_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para actualizar esta cita.'], 403);
        }

        $cita->update(['estado' => $request->estado]);
        return response()->json(['message' => 'Cita actualizada correctamente.']);
    }

    // Eliminar cita (Clientes)
    public function destroy(Cita $cita)
    {
        $user = Auth::user();
        if ($user->rol !== 'cliente' || $cita->cliente_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para eliminar esta cita.'], 403);
        }

        $cita->delete();
        return response()->json(['message' => 'Cita eliminada correctamente.']);
    }
}
