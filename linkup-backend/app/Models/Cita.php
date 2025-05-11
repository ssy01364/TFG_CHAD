<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    protected $fillable = ['cliente_id', 'empresa_id', 'servicio_id', 'fecha_cita', 'estado', 'mensaje'];

    // Relación: Una cita pertenece a un cliente
    public function cliente()
    {
        return $this->belongsTo(Usuario::class, 'cliente_id');
    }

    // Relación: Una cita pertenece a una empresa
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    // Relación: Una cita pertenece a un servicio
    public function servicio()
    {
        return $this->belongsTo(Servicio::class, 'servicio_id');
    }

    // Relación: Una cita puede tener una reseña (opcional)
    public function reseña()
    {
        return $this->hasOne(Reseña::class, 'cita_id');
    }
}
