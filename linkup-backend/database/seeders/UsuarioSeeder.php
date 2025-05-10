<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        // Cliente
        Usuario::create([
            'nombre' => 'Cliente Demo',
            'email' => 'cliente@linkup.com',
            'password' => Hash::make('cliente123'),
            'rol' => 'cliente'
        ]);

        // Empresa 1
        Usuario::create([
            'nombre' => 'Empresa Alpha',
            'email' => 'alpha@linkup.com',
            'password' => Hash::make('empresa123'),
            'rol' => 'empresa'
        ]);

        // Empresa 2
        Usuario::create([
            'nombre' => 'Empresa Beta',
            'email' => 'beta@linkup.com',
            'password' => Hash::make('empresa123'),
            'rol' => 'empresa'
        ]);
    }
}
