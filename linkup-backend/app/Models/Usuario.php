<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['nombre', 'email', 'password', 'rol'];

    public function empresa()
    {
        return $this->hasOne(Empresa::class, 'usuario_id');
    }

    public function citas()
    {
        return $this->hasMany(Cita::class, 'cliente_id');
    }
}
