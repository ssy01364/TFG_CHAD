<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use App\Models\Empresa;

class CitaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $empresa = Empresa::where('usuario_id', $user->id)->firstOrFail();
        return response()->json($empresa->citas);
    }
}
