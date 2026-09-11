<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PenggunaResource;
use App\Models\Pengguna;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        //
    }

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
