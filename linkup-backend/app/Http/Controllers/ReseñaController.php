<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reseña;
use App\Models\Cita;

class ReseñaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'cita_id' => 'required|exists:citas,id',
            'puntuacion' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
        ]);

        $cita = Cita::findOrFail($request->cita_id);

        if ($cita->cliente_id !== $request->user()->id || $cita->estado !== 'aceptada') {
            return response()->json(['error' => 'No autorizado o cita no válida'], 403);
        }

        $reseña = Reseña::create([
            'cliente_id' => $request->user()->id,
            'empresa_id' => $cita->empresa_id,
            'cita_id' => $cita->id,
            'puntuacion' => $request->puntuacion,
            'comentario' => $request->comentario,
        ]);

        return response()->json($reseña, 201);
    }
}
