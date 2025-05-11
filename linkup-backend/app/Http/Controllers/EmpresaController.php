<?php 

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmpresaController extends Controller
{
    // ✅ Listar todas las empresas (Público)
    public function index()
    {
        return response()->json(Empresa::with('usuario')->get(), 200);
    }

    // ✅ Mostrar una empresa específica (Solo si el usuario tiene permiso)
    public function show(Empresa $empresa)
    {
        $this->authorize('manage', $empresa); // Verificar que sea el dueño
        return response()->json($empresa, 200);
    }

    // ✅ Registrar una nueva empresa (Solo empresas)
    public function store(Request $request)
    {
        $user = Auth::user();

        // ✅ Verificar si el usuario es una empresa
        if ($user->rol !== 'empresa') {
            return response()->json(['message' => 'Solo las empresas pueden registrar.'], 403);
        }

        // ✅ Verificar si ya tiene una empresa registrada
        if (Empresa::where('usuario_id', $user->id)->exists()) {
            return response()->json(['message' => 'Ya tienes una empresa registrada.'], 400);
        }

        // ✅ Validar datos
        $this->validateEmpresa($request);

        try {
            $empresa = Empresa::create([
                'usuario_id' => $user->id,
                'nombre' => $request->nombre,
                'sector' => $request->sector,
                'descripcion' => $request->descripcion,
                'ubicacion' => $request->ubicacion,
                'telefono' => $request->telefono,
            ]);

            return response()->json([
                'message' => '✅ Empresa registrada correctamente.', 
                'empresa' => $empresa
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => '❌ Error al registrar la empresa.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Actualizar una empresa (Solo si el usuario tiene permiso)
    public function update(Request $request, Empresa $empresa)
    {
        $this->authorize('manage', $empresa); // Verificar que sea el dueño
        
        // ✅ Validar datos
        $this->validateEmpresa($request);

        try {
            $empresa->update([
                'nombre' => $request->nombre,
                'sector' => $request->sector,
                'descripcion' => $request->descripcion,
                'ubicacion' => $request->ubicacion,
                'telefono' => $request->telefono,
            ]);

            return response()->json([
                'message' => '✅ Empresa actualizada correctamente.', 
                'empresa' => $empresa
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => '❌ Error al actualizar la empresa.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Eliminar una empresa (Solo si el usuario tiene permiso)
    public function destroy(Empresa $empresa)
    {
        $this->authorize('manage', $empresa); // Verificar que sea el dueño

        try {
            $empresa->delete();
            return response()->json(['message' => '✅ Empresa eliminada correctamente.'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => '❌ Error al eliminar la empresa.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Método Privado para Validar Empresas
    private function validateEmpresa(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'sector' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'ubicacion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
        ]);
    }
}
