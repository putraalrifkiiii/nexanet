<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePembayaranRequest;
use App\Http\Resources\PembayaranApiResource;
use App\Models\Langganan;
use App\Models\Pembayaran;
use App\Models\Pengguna;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembayaran = Pembayaran::with([
            'pengguna',
            'langganan.paketWifi',
            'langganan.teknisi',
        ])
            ->latest()
            ->get();

        if ($pembayaran->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Daftar pembayaran tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Daftar pembayaran berhasil ditemukan',
            'data' => PembayaranApiResource::collection($pembayaran),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePembayaranRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $validatedData['id_pengguna'] = 2;
            $validatedData['nomor_pembayaran'] = Pembayaran::paymentNumber();

            $langganan = Langganan::find($validatedData['id_langganan']);

            $paket = $langganan->paketWifi;
            if (! $paket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Paket WiFi tidak ditemukan untuk langganan ini',
                ], 404);
            }

            $validatedData['total_pembayaran'] = $paket->harga + 150000;
            $validatedData['status_pembayaran'] = 'Pending';

            if (! isset($validatedData['tanggal_bayar'])) {
                $validatedData['tanggal_bayar'] = now()->toDateString();
            }

            if (! $request->hasFile('bukti_pembayaran')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bukti pembayaran harus diunggah',
                ], 422);
            }

            if ($request->hasFile('bukti_pembayaran')) {
                $filePath = $request->file('bukti_pembayaran')->store('bukti_pembayaran', 'public');
                $validatedData['bukti_pembayaran'] = $filePath;
            }
            $pembayaran = Pembayaran::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran beserta bukti transfer berhasil disimpan',
                'data' => new PembayaranApiResource($pembayaran->load(['langganan.pengguna', 'langganan.paketWifi'])),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server',
                'error' => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pembayaran $pembayaran)
    {
        $pembayaran->load([
            'langganan.pengguna',
            'langganan.paketWifi',
            'langganan.teknisi',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Detail pembayaran berhasil ditemukan',
            'data' => new PembayaranApiResource($pembayaran),
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

    public function cekStatusLangganan(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|exists:pengguna,email',        ]);

        $user = Pengguna::where('email', $validated['email'])
            ->with([
                'pembayaran' => fn ($q) => $q->latest(),
                'pengaduan' => fn ($q) => $q->latest(),
                'langganan.paketWifi',
            ])
            ->first();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail status ditemukan',
            'data' => new PembayaranApiResource($user->pembayaran->first()),
        ], 200);
    }
}
