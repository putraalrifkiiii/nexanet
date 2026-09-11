<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LanggananApiResource extends JsonResource
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
            'tanggal_mulai' => $this->tanggal_mulai ?? null,
            'tanggal_berakhir' => $this->tanggal_berakhir ?? null,
            'status_langganan' => $this->status_langganan ?? null,
            'biaya_pemasangan' => $this->biaya_pemasangan ?? null,
            'paket_wifi' => [
                'id_paket' => $this->paketWifi->id ?? null,
                'nama_paket' => $this->paketWifi->nama_paket ?? null,
                'kecepatan_mbps' => $this->paketWifi->kecepatan_mbps ?? null,
                'harga' => $this->paketWifi->harga ?? null,
                'deskripsi_paket' => $this->paketWifi->deskripsi_paket ?? null,
            ],
            'teknisi' => [
                'id_teknisi' => $this->teknisi->id ?? null,
                'nama_teknisi' => $this->teknisi->nama_teknisi ?? null,
                'no_telepon' => $this->teknisi->no_telepon ?? null,
                'status_ketersediaan' => $this->teknisi->status_ketersediaan ?? null,
            ],
        ];
    }
}
