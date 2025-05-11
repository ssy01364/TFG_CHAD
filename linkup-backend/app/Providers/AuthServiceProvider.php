<?php

namespace App\Providers;

use App\Models\Empresa;
use App\Policies\EmpresaPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Las políticas de la aplicación.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Empresa::class => EmpresaPolicy::class, // ✅ Política de Empresa
    ];

    /**
     * Registrar cualquier servicio de autenticación / autorización.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // ✅ Política de Servicios (Propietario)
        Gate::define('manage-service', function ($user, $servicio) {
            return $user->id === $servicio->empresa->usuario_id;
        });
    }
}
