<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $fillable = ['usuario_id', 'nombre', 'descripcion', 'sector'];

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
}
