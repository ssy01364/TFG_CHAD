<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Servicio;
use App\Models\Cita;

class EmpresaController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $empresa = Empresa::where('usuario_id', $user->id)->firstOrFail();
        return response()->json($empresa);
    }

    public function dashboard(Request $request)
    {
        $user = $request->user();
        $empresa = Empresa::where('usuario_id', $user->id)->firstOrFail();

        return response()->json([
            'totalServicios' => $empresa->servicios()->count(),
            'citasPendientes' => $empresa->citas()->where('estado', 'pendiente')->count(),
            'citasAceptadas' => $empresa->citas()->where('estado', 'aceptada')->count(),
            'citasRechazadas' => $empresa->citas()->where('estado', 'rechazada')->count()
        ]);
    }
}
