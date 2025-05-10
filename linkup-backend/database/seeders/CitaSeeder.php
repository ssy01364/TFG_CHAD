<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cita;
use App\Models\Usuario;
use App\Models\Empresa;
use App\Models\Servicio;

class CitaSeeder extends Seeder
{
    public function run(): void
    {
        $cliente = Usuario::where('rol', 'cliente')->first();
        $empresa1 = Empresa::where('sector', 'Salud')->first();
        $empresa2 = Empresa::where('sector', 'Tecnología')->first();

        $servicio1 = Servicio::where('empresa_id', $empresa1->id)->first();
        $servicio2 = Servicio::where('empresa_id', $empresa2->id)->first();

        Cita::create([
            'cliente_id' => $cliente->id,
            'empresa_id' => $empresa1->id,
            'servicio_id' => $servicio1->id,
            'fecha_cita' => now()->addDays(2)->format('Y-m-d'),
            'estado' => 'aceptada',
            'mensaje' => 'Tengo dolor en la rodilla.'
        ]);

        Cita::create([
            'cliente_id' => $cliente->id,
            'empresa_id' => $empresa2->id,
            'servicio_id' => $servicio2->id,
            'fecha_cita' => now()->addDays(5)->format('Y-m-d'),
            'estado' => 'pendiente',
            'mensaje' => 'Mi portátil no enciende.'
        ]);
    }
}
