<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cita;
use App\Models\Reseña;

class ReseñaSeeder extends Seeder
{
    public function run(): void
    {
        $cita = Cita::where('estado', 'aceptada')->first();

        if ($cita) {
            Reseña::create([
                'cliente_id' => $cita->cliente_id,
                'empresa_id' => $cita->empresa_id,
                'cita_id' => $cita->id,
                'puntuacion' => 5,
                'comentario' => '¡Muy buen servicio, profesional y puntual!'
            ]);
        }
    }
}
