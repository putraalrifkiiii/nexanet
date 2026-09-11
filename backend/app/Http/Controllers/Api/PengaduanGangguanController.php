<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePengaduanGangguanRequest;
use App\Http\Resources\PengaduanGangguanResource;
use App\Models\PengaduanGangguan;
use App\Models\Pengguna;
use Illuminate\Http\Request;

class PengaduanGangguanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengaduan = PengaduanGangguan::with([
            'pengguna',
            'teknisi',
        ])
            ->latest()
            ->get();

        if ($pengaduan->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Daftar pengaduan gangguan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Daftar pengaduan gangguan berhasil ditemukan',
            'data' => PengaduanGangguanResource::collection($pengaduan),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePengaduanGangguanRequest $request)
    {
        $validated = $request->validated();

        $pengguna = Pengguna::where(
            'email',
            $validated['email']
        )->firstOrFail();

        $pengaduan = PengaduanGangguan::create([
            'id_pengguna' => $pengguna->id,
            'kategori_pengaduan' => $validated['kategori_pengaduan'],
            'deskripsi_masalah' => $validated['deskripsi_masalah'],
            'status_penanganan' => 'pending',
        ]);

        $pengaduan->load([
            'pengguna',
            'teknisi',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil dibuat',
            'data' => new PengaduanGangguanResource($pengaduan),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PengaduanGangguan $pengaduan)
    {
        $pengaduan->load([
            'pengguna',
            'teknisi',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Detail pengaduan gangguan berhasil ditemukan',
            'data' => new PengaduanGangguanResource($pengaduan),
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
