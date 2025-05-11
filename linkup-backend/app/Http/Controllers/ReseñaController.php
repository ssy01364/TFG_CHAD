<?php

namespace App\Http\Controllers;

use App\Models\Reseña;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReseñaController extends Controller
{
    // Listar reseñas
    public function index()
    {
        return Reseña::with('cliente', 'empresa')->get();
    }

    // Crear una nueva reseña (Clientes)
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->rol !== 'cliente') {
            return response()->json(['message' => 'Solo los clientes pueden dejar reseñas.'], 403);
        }

        $request->validate([
            'cita_id' => 'required|exists:citas,id',
            'puntuacion' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string'
        ]);

        $reseña = Reseña::create([
            'cliente_id' => $user->id,
            'empresa_id' => $request->empresa_id,
            'cita_id' => $request->cita_id,
            'puntuacion' => $request->puntuacion,
            'comentario' => $request->comentario
        ]);

        return response()->json(['message' => 'Reseña guardada correctamente.', 'reseña' => $reseña]);
    }
}
