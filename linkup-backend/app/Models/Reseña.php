<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reseña extends Model
{
    protected $fillable = ['cliente_id', 'empresa_id', 'cita_id', 'puntuacion', 'comentario'];

    // Relación: Una reseña pertenece a un cliente
    public function cliente()
    {
        return $this->belongsTo(Usuario::class, 'cliente_id');
    }

    // Relación: Una reseña pertenece a una empresa
    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    // Relación: Una reseña pertenece a una cita
    public function cita()
    {
        return $this->belongsTo(Cita::class);
    }
}
