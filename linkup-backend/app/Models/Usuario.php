<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['nombre', 'email', 'password', 'rol'];

    // Relación: Un usuario puede tener una empresa (Si es una empresa)
    public function empresa()
    {
        return $this->hasOne(Empresa::class, 'usuario_id');
    }

    // Relación: Un usuario (cliente) puede tener muchas citas
    public function citas()
    {
        return $this->hasMany(Cita::class, 'cliente_id');
    }

    // Relación: Un usuario (cliente) puede dejar muchas reseñas
    public function reseñas()
    {
        return $this->hasMany(Reseña::class, 'cliente_id');
    }
}
