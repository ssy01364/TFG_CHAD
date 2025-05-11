<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $fillable = ['empresa_id', 'nombre', 'descripcion', 'precio'];

    // Relación: Un servicio pertenece a una empresa
    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    // Relación: Un servicio puede estar asociado a muchas citas
    public function citas()
    {
        return $this->hasMany(Cita::class);
    }
}
