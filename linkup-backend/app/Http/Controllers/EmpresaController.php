<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmpresaController extends Controller
{
    // Listar todas las empresas (públicas)
    public function index()
    {
        return Empresa::with('servicios')->get();
    }

    // Mostrar una empresa específica
    public function show(Empresa $empresa)
    {
        return response()->json($empresa->load('servicios'));
    }

    // Crear una nueva empresa (Solo administradores)
    public function store(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'nombre' => 'required|string|max:255',
            'sector' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'ubicacion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
        ]);

        $empresa = Empresa::create([
            'usuario_id' => $request->usuario_id,
            'nombre' => $request->nombre,
            'sector' => $request->sector,
            'descripcion' => $request->descripcion,
            'ubicacion' => $request->ubicacion,
            'telefono' => $request->telefono,
        ]);

        return response()->json(['message' => 'Empresa creada correctamente.', 'empresa' => $empresa]);
    }

    // Actualizar una empresa (Solo el propietario)
    public function update(Request $request, Empresa $empresa)
    {
        $user = Auth::user();
        if ($user->id !== $empresa->usuario_id) {
            return response()->json(['message' => 'No tienes permiso para actualizar esta empresa.'], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'sector' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'ubicacion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
        ]);

        $empresa->update([
            'nombre' => $request->nombre,
            'sector' => $request->sector,
            'descripcion' => $request->descripcion,
            'ubicacion' => $request->ubicacion,
            'telefono' => $request->telefono,
        ]);

        return response()->json(['message' => 'Empresa actualizada correctamente.', 'empresa' => $empresa]);
    }

    // Eliminar una empresa (Solo el propietario)
    public function destroy(Empresa $empresa)
    {
        $user = Auth::user();
        if ($user->id !== $empresa->usuario_id) {
            return response()->json(['message' => 'No tienes permiso para eliminar esta empresa.'], 403);
        }

        $empresa->delete();
        return response()->json(['message' => 'Empresa eliminada correctamente.']);
    }
}
