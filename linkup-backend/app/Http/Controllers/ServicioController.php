<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Servicio;
use App\Models\Empresa;

class ServicioController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $empresa = Empresa::where('usuario_id', $user->id)->firstOrFail();
        return response()->json($empresa->servicios);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $empresa = Empresa::where('usuario_id', $user->id)->firstOrFail();

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric'
        ]);

        $servicio = $empresa->servicios()->create($request->only('nombre', 'descripcion', 'precio'));

        return response()->json($servicio, 201);
    }
}
