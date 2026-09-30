<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LanggananController;
use App\Http\Controllers\Api\PaketWifiController;
use App\Http\Controllers\Api\PembayaranController;
use App\Http\Controllers\Api\PengaduanGangguanController;
use App\Http\Controllers\Api\PenggunaController;
use App\Http\Controllers\Api\TeknisiController;
use App\Http\Resources\PenggunaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('teknisi', TeknisiController::class)
    ->missing(function () {
        return response()->json([
            'success' => false,
            'message' => 'Data teknisi dengan ID tersebut tidak ditemukan',
            'data' => null,
        ], 404);
    });

Route::apiResource('/paket-wifi', PaketWifiController::class);
Route::get('/paket-wifi/{PaketWifi:slug}', [PaketWifiController::class, 'show']);

Route::apiResource('langganan', LanggananController::class);

Route::get('/pembayaran/cek-status', [PembayaranController::class, 'cekStatusLangganan']);
Route::apiResource('pembayaran', PembayaranController::class);

Route::apiResource('pengaduan', PengaduanGangguanController::class)
    ->missing(function () {
        return response()->json([
            'success' => false,
            'message' => 'Data pengaduan gangguan dengan ID tersebut tidak ditemukan',
            'data' => null,
        ], 404);
    });

Route::apiResource('pengguna', PenggunaController::class)
    ->missing(function () {
        return response()->json([
            'success' => false,
            'message' => 'Data pengguna dengan ID tersebut tidak ditemukan',
            'data' => null,
        ], 404);
    });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/dashboard', function (Request $request) {
    return response()->json([
        'data' => new PenggunaResource($request->user()),
    ]);
});
