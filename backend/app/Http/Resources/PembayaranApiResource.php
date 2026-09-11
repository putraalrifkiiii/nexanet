<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PembayaranApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nomor_pembayaran' => $this->nomor_pembayaran,
            'jumlah_bayar' => $this->total_pembayaran,
            'tanggal_bayar' => $this->tanggal_bayar,
            'metode_pembayaran' => $this->metode_pembayaran,
            'bukti_pembayaran' => $this->bukti_pembayaran ? asset('storage/'.$this->bukti_pembayaran) : null,
            'status_pembayaran' => $this->status_pembayaran,
            'pengguna' => [
                'id_pengguna' => $this->id_pengguna,
                'nama' => $this->langganan->pengguna->nama ?? null,
                'alamat' => $this->langganan->pengguna->alamat ?? null,
                'no_telepon' => $this->langganan->pengguna->no_telepon ?? null,
                'email' => $this->langganan->pengguna->email ?? null,
            ],
            'langganan' => [
                'id_langganan' => $this->id_langganan,
                'tanggal_mulai' => $this->langganan->tanggal_mulai ?? null,
                'tanggal_berakhir' => $this->langganan->tanggal_berakhir ?? null,
                'status_langganan' => $this->langganan->status_langganan ?? null,
                'biaya_pemasangan' => $this->langganan->biaya_pemasangan ?? null,
                'paket_wifi' => [
                    'id_paket' => $this->langganan->paketWifi->id ?? null,
                    'nama_paket' => $this->langganan->paketWifi->nama_paket ?? null,
                    'kecepatan_mbps' => $this->langganan->paketWifi->kecepatan_mbps ?? null,
                    'harga' => $this->langganan->paketWifi->harga ?? null,
                    'deskripsi_paket' => $this->langganan->paketWifi->deskripsi_paket ?? null,
                ],
                'teknisi' => [
                    'id_teknisi' => $this->langganan->teknisi->id ?? null,
                    'nama_teknisi' => $this->langganan->teknisi->nama_teknisi ?? null,
                    'no_telepon' => $this->langganan->teknisi->no_telepon ?? null,
                    'status_ketersediaan' => $this->langganan->teknisi->status_ketersediaan ?? null,
                ],
            ],
        ];
    }
}
