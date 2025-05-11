<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Manejar una petición entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = Auth::user();
        
        // Verificar si el usuario está autenticado
        if (!$user) {
            return response()->json(['message' => 'No autenticado. Inicia sesión.'], 401);
        }

        // Verificar si el usuario tiene alguno de los roles permitidos
        if (!in_array($user->rol, $roles)) {
            return response()->json(['message' => 'Acceso denegado. No tienes el rol adecuado.'], 403);
        }

        return $next($request);
    }
}
