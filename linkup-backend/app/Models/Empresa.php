<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $fillable = [
        'usuario_id',
        'sector',
        'descripcion',
        'ubicacion',
        'telefono'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    public function reseñas()
    {
        return $this->hasMany(Reseña::class);
    }
}
