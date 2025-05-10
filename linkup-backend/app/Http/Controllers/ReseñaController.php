<?php

namespace App\Http\Controllers;

use App\Models\Reseña;
use App\Models\Cita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReseñaController extends Controller
{
    // Listar reseñas del usuario autenticado
    public function index()
    {
        $user = Auth::user();

        // Si es cliente, ver solo sus reseñas
        if ($user->rol === 'cliente') {
            return Reseña::with('empresa', 'cita')
                ->where('cliente_id', $user->id)
                ->get();
        }

        // Si es empresa, ver las reseñas recibidas
        if ($user->rol === 'empresa') {
            return Reseña::with('cliente', 'cita')
                ->where('empresa_id', $user->empresa->id)
                ->get();
        }

        return response()->json(['message' => 'No tienes acceso a esta sección.'], 403);
    }

    // Crear nueva reseña (solo clientes)
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->rol !== 'cliente') {
            return response()->json(['message' => 'Solo los clientes pueden dejar reseñas.'], 403);
        }

        $request->validate([
            'cita_id' => 'required|exists:citas,id',
            'puntuacion' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
        ]);

        $cita = Cita::find($request->cita_id);

        // Verificar que la cita pertenece al cliente y que está completada
        if ($cita->cliente_id !== $user->id || $cita->estado !== 'aceptada') {
            return response()->json(['message' => 'No puedes dejar una reseña para esta cita.'], 403);
        }

        $resena = Reseña::create([
            'cliente_id' => $user->id,
            'empresa_id' => $cita->empresa_id,
            'cita_id' => $cita->id,
            'puntuacion' => $request->puntuacion,
            'comentario' => $request->comentario
        ]);

        return response()->json(['message' => 'Reseña creada correctamente.', 'reseña' => $resena]);
    }
}
