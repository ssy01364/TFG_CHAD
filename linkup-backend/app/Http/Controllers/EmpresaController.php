<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmpresaController extends Controller
{
    // Listar todas las empresas (Público)
    public function index()
    {
        return Empresa::with('usuario')->get();
    }

    // Mostrar una empresa específica (Protegido)
    public function show(Empresa $empresa)
    {
        return response()->json($empresa);
    }

    // Registrar una nueva empresa (Solo empresas)
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa') {
            return response()->json(['message' => 'Solo las empresas pueden registrar.'], 403);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'sector' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'ubicacion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
        ]);

        // Verificar si el usuario ya tiene una empresa registrada
        if (Empresa::where('usuario_id', $user->id)->exists()) {
            return response()->json(['message' => 'Ya tienes una empresa registrada.'], 400);
        }

        $empresa = Empresa::create([
            'usuario_id' => $user->id,
            'nombre' => $request->nombre,
            'sector' => $request->sector,
            'descripcion' => $request->descripcion,
            'ubicacion' => $request->ubicacion,
            'telefono' => $request->telefono,
        ]);

        return response()->json(['message' => 'Empresa registrada correctamente.', 'empresa' => $empresa], 201);
    }

    // Actualizar una empresa existente (Solo empresas)
    public function update(Request $request, Empresa $empresa)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa' || $empresa->usuario_id !== $user->id) {
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

    // Eliminar una empresa (Solo empresas)
    public function destroy(Empresa $empresa)
    {
        $user = Auth::user();
        if ($user->rol !== 'empresa' || $empresa->usuario_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para eliminar esta empresa.'], 403);
        }

        $empresa->delete();
        return response()->json(['message' => 'Empresa eliminada correctamente.']);
    }
}
