<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $fillable = [
        'empresa_id',
        'nombre',
        'descripcion',
        'precio'
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function citas()
    {
        return $this->hasMany(Cita::class);
    }
}
