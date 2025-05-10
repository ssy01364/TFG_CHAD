<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // REGISTRO
    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|unique:usuarios',
            'password' => 'required|string|min:6',
            'rol' => 'required|in:cliente,empresa',
        ]);

        $usuario = Usuario::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'rol' => $request->rol,
        ]);

        $token = $usuario->createToken('token')->plainTextToken;

        return response()->json([
            'usuario' => $usuario,
            'token' => $token
        ], 201);
    }

    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $usuario->createToken('token')->plainTextToken;

        return response()->json([
            'usuario' => $usuario,
            'token' => $token
        ], 200);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    public function actualizarPerfil(Request $request)
{
    $user = $request->user();

    $request->validate([
        'nombre' => 'required|string|max:255',
        'password' => 'nullable|string|min:6|confirmed',
    ]);

    $user->nombre = $request->nombre;

    if ($request->filled('password')) {
        $user->password = bcrypt($request->password);
    }

    $user->save();

    return response()->json(['usuario' => $user, 'message' => 'Perfil actualizado']);
}

}
