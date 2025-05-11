<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // ✅ Registro de usuario
    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:6',
            'rol' => 'required|in:cliente,empresa'
        ]);

        try {
            $usuario = Usuario::create([
                'nombre' => $request->nombre,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'rol' => $request->rol
            ]);

            $token = $usuario->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $usuario, 
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrar usuario.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Inicio de sesión
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $usuario, 
            'token' => $token
        ], 200);
    }

    // ✅ Cerrar sesión
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al cerrar sesión.'], 500);
        }
    }

    // ✅ Obtener usuario autenticado
    public function getUser(Request $request)
    {
        return response()->json([
            'user' => $request->user()->only('id', 'nombre', 'email', 'rol')
        ], 200);
    }

    // ✅ Actualizar perfil del usuario
    public function updateProfile(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email,' . $request->user()->id
        ]);

        try {
            $user = $request->user();
            $user->update($request->only('nombre', 'email'));

            return response()->json([
                'message' => 'Perfil actualizado correctamente', 
                'user' => $user->only('id', 'nombre', 'email')
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar perfil.'], 500);
        }
    }

    // ✅ Eliminar cuenta del usuario
    public function deleteAccount(Request $request)
    {
        try {
            $user = $request->user();
            $user->tokens()->delete(); // Eliminar todos los tokens del usuario
            $user->delete();
            return response()->json(['message' => 'Cuenta eliminada correctamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar la cuenta.'], 500);
        }
    }
}
