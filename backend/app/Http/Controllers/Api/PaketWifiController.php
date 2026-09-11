<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaketWifiApiResource;
use App\Models\PaketWifi;
use Illuminate\Http\Request;

class PaketWifiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paketWifi = PaketWifi::latest()->get();

        if ($paketWifi->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Daftar paket WiFi tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Daftar paket WiFi berhasil ditemukan',
            'data' => PaketWifiApiResource::collection($paketWifi),
        ], 200);

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
    public function show(PaketWifi $paketWifi)
    {
        return new PaketWifiApiResource($paketWifi);
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
