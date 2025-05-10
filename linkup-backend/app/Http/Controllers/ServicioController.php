<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServicioController extends Controller
{
    // Listar todos los servicios (público)
    public function index()
    {
        return Servicio::with('empresa')->get();
    }

    // Mostrar los servicios de una empresa específica
    public function show(Empresa $empresa)
    {
        return $empresa->load('servicios');
    }

    // Crear un nuevo servicio (Solo empresas)
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa') {
            return response()->json(['message' => 'Solo las empresas pueden crear servicios.'], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
        ]);

        $servicio = Servicio::create([
            'empresa_id' => $user->empresa->id,
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
        ]);

        return response()->json(['message' => 'Servicio creado correctamente.', 'servicio' => $servicio]);
    }

    // Actualizar un servicio (Solo empresas propietarias)
    public function update(Request $request, Servicio $servicio)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa' || $servicio->empresa_id !== $user->empresa->id) {
            return response()->json(['message' => 'No tienes permiso para actualizar este servicio.'], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
        ]);

        $servicio->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
        ]);

        return response()->json(['message' => 'Servicio actualizado correctamente.', 'servicio' => $servicio]);
    }

    // Eliminar un servicio (Solo empresas propietarias)
    public function destroy(Servicio $servicio)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa' || $servicio->empresa_id !== $user->empresa->id) {
            return response()->json(['message' => 'No tienes permiso para eliminar este servicio.'], 403);
        }

        $servicio->delete();
        return response()->json(['message' => 'Servicio eliminado correctamente.']);
    }
}
