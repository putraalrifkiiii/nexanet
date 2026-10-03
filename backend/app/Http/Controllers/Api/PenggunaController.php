<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PenggunaResource;
use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PenggunaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengguna = Pengguna::latest()->get();

        if ($pengguna->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Data pengguna tidak ditemukan',
                'data' => null,
            ], 404);
        }

        return PenggunaResource::collection($pengguna);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(Pengguna $pengguna)
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail data pengguna berhasil diambil',
            'data' => new PenggunaResource($pengguna),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pengguna = Pengguna::find($id);

        if (! $pengguna) {
            return response()->json([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan',
            ], 404);
        }

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'alamat' => ['required', 'string'],
            'no_telepon' => ['required', 'string', 'max:15'],
            'email' => [
                'required',
                'email',
                Rule::unique('pengguna', 'email')->ignore($pengguna->id),
            ],
        ]);

        $pengguna->update($validated);

        $pengguna->load('langganan');

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'data' => new PenggunaResource($pengguna),
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
