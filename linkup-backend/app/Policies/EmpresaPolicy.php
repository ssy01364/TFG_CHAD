<?php

namespace App\Policies;

use App\Models\Empresa;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmpresaPolicy
{
    use HandlesAuthorization;

    /**
     * Verificar si el usuario puede gestionar (ver, actualizar, eliminar) la empresa.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Empresa  $empresa
     * @return bool
     */
    public function manage(User $user, Empresa $empresa)
    {
        // Solo el propietario de la empresa puede gestionarla
        return $user->id === $empresa->usuario_id;
    }

    /**
     * Verificar si el usuario puede ver la empresa.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Empresa  $empresa
     * @return bool
     */
    public function view(User $user, Empresa $empresa)
    {
        // Permitir que cualquier usuario vea las empresas (si es público)
        return true;
    }

    /**
     * Verificar si el usuario puede actualizar la empresa.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Empresa  $empresa
     * @return bool
     */
    public function update(User $user, Empresa $empresa)
    {
        // Solo el propietario de la empresa puede actualizarla
        return $user->id === $empresa->usuario_id;
    }

    /**
     * Verificar si el usuario puede eliminar la empresa.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Empresa  $empresa
     * @return bool
     */
    public function delete(User $user, Empresa $empresa)
    {
        // Solo el propietario de la empresa puede eliminarla
        return $user->id === $empresa->usuario_id;
    }
}
