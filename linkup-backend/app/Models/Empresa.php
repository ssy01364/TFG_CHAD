<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $fillable = [
        'usuario_id',
        'nombre',
        'sector',
        'descripcion',
        'ubicacion',
        'telefono'
    ];

    // Relación con Usuario (propietario)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación con Servicios
    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }

    // Relación con Reseñas
    public function reseñas()
    {
        return $this->hasMany(Reseña::class);
    }
}
