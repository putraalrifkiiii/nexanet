<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLanggananRequest;
use App\Http\Resources\LanggananApiResource;
use App\Models\Langganan;
use App\Models\Pengguna;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LanggananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pengguna = Pengguna::where('email', $request->email)->first();

        if (! $pengguna) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak ditemukan',
            ], 404);
        }

        $langganan = Langganan::with(['pengguna', 'paketWifi', 'teknisi'])
            ->where('id_pengguna', $pengguna->id)
            ->get();

        return LanggananApiResource::collection($langganan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLanggananRequest $request)
    {
        $validated = $request->validated();

        $langganan = DB::transaction(function () use ($validated) {

            $pengguna = Pengguna::create([
                'nama' => $validated['nama'],
                'alamat' => $validated['alamat'],
                'no_telepon' => $validated['no_telepon'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            return Langganan::create([
                'id_pengguna' => $pengguna->id,
                'id_paket' => $validated['id_paket'],
                'id_teknisi' => null,
                'status_langganan' => 'menunggu_pembayaran',
                'biaya_pemasangan' => 150000,
                'tanggal_mulai' => null,
                'tanggal_berakhir' => null,
            ]);
        });

        $langganan->load(['pengguna', 'paketWifi', 'teknisi']);

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran langganan berhasil dibuat',
            'data' => new LanggananApiResource($langganan),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Langganan $langganan)
    {

        if (! $langganan) {
            return response()->json([
                'success' => false,
                'message' => 'Langganan tidak ditemukan',
            ], 404);
        }

        $langganan->load(['paketWifi', 'pengguna', 'teknisi']);

        return response()->json([
            'success' => true,
            'data' => new LanggananApiResource($langganan),
        ]);
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
