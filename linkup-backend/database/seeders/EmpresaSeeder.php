<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Empresa;
use App\Models\Usuario;

class EmpresaSeeder extends Seeder
{
    public function run(): void
    {
        $alpha = Usuario::where('email', 'alpha@linkup.com')->first();
        $beta = Usuario::where('email', 'beta@linkup.com')->first();

        Empresa::create([
            'usuario_id' => $alpha->id,
            'sector' => 'Salud',
            'descripcion' => 'Centro de fisioterapia avanzada.',
            'ubicacion' => 'Calle Salud 123',
            'telefono' => '600111222'
        ]);

        Empresa::create([
            'usuario_id' => $beta->id,
            'sector' => 'Tecnología',
            'descripcion' => 'Asistencia técnica a domicilio.',
            'ubicacion' => 'Av. Tecnología 45',
            'telefono' => '699888777'
        ]);
    }
}
