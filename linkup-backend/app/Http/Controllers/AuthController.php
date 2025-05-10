<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Registro de Usuarios
    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|min:6',
            'rol' => 'required|in:cliente,empresa'
        ]);

        $user = Usuario::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => $request->rol,
        ]);

        return response()->json(['user' => $user, 'message' => 'Usuario registrado correctamente.'], 201);
    }

    // Inicio de sesión
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas.'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

    // Cierre de sesión
    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json(['message' => 'Sesión cerrada correctamente.']);
    }

    // Actualizar perfil del usuario
    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email,' . $user->id,
        ]);

        $user->update([
            'nombre' => $request->nombre,
            'email' => $request->email,
        ]);

        return response()->json(['message' => 'Perfil actualizado correctamente.']);
    }

    // Eliminar cuenta del usuario
    public function deleteAccount()
    {
        $user = auth()->user();
        $user->delete();
        return response()->json(['message' => 'Cuenta eliminada correctamente.']);
    }
}
