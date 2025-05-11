<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServicioController extends Controller
{
    // Listar servicios de una empresa
    public function show($empresa_id)
    {
        return Servicio::where('empresa_id', $empresa_id)->get();
    }

    // Crear servicio (Solo empresas)
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa') {
            return response()->json(['message' => 'Solo las empresas pueden crear servicios.'], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric'
        ]);

        $servicio = Servicio::create([
            'empresa_id' => $user->id,
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio
        ]);

        return response()->json(['message' => 'Servicio creado correctamente.', 'servicio' => $servicio]);
    }
}
