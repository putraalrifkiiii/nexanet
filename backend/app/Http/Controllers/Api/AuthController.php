<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PenggunaResource;
use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:pengguna,email',
            'password' => 'required|min:8',
            'alamat' => 'required',
            'no_telepon' => 'required',
        ]);

        $pengguna = Pengguna::create([
            'nama' => $validated['nama'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'alamat' => $validated['alamat'],
            'no_telepon' => $validated['no_telepon'],
        ]);

        return response()->json([
            'message' => 'Registrasi berhasil',
            'data' => new PenggunaResource($pengguna),
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $pengguna = Pengguna::where('email', $validated['email'])->first();

        if (! $pengguna || ! Hash::check($validated['password'], $pengguna->password)) {
            return response()->json([
                'message' => 'Email atau password salah',
            ], 401);
        }

        $token = $pengguna->createToken('customer-token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'data' => new PenggunaResource($pengguna),
            'token' => $token,
        ]);
    }
}
