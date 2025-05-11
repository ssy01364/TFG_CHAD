<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $fillable = ['usuario_id', 'nombre', 'descripcion', 'sector', 'ubicacion', 'telefono'];

    // Relación: Una empresa pertenece a un usuario (dueño)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación: Una empresa puede tener muchos servicios
    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }

    // Relación: Una empresa puede tener muchas citas
    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    // Relación: Una empresa puede recibir muchas reseñas
    public function reseñas()
    {
        return $this->hasMany(Reseña::class, 'empresa_id');
    }
}
