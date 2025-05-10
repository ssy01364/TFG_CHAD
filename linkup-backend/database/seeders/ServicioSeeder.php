<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Empresa;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    public function run(): void
    {
        $empresa1 = Empresa::where('sector', 'Salud')->first();
        $empresa2 = Empresa::where('sector', 'Tecnología')->first();

        Servicio::create([
            'empresa_id' => $empresa1->id,
            'nombre' => 'Fisioterapia deportiva',
            'descripcion' => 'Sesión de 1 hora con especialista',
            'precio' => 45.00
        ]);

        Servicio::create([
            'empresa_id' => $empresa1->id,
            'nombre' => 'Masaje relajante',
            'descripcion' => 'Tratamiento antiestrés completo',
            'precio' => 35.00
        ]);

        Servicio::create([
            'empresa_id' => $empresa2->id,
            'nombre' => 'Reparación PC',
            'descripcion' => 'Diagnóstico y reparación básica',
            'precio' => 30.00
        ]);

        Servicio::create([
            'empresa_id' => $empresa2->id,
            'nombre' => 'Instalación WiFi',
            'descripcion' => 'Montaje y configuración en casa',
            'precio' => 50.00
        ]);
    }
}

