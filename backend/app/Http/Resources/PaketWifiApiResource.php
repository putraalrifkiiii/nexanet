<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaketWifiApiResource extends JsonResource
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
            'nama_paket' => $this->nama_paket ?? null,
            'kecepatan_mbps' => $this->kecepatan_mbps ?? null,
            'harga' => $this->harga ?? null,
            'deskripsi_paket' => $this->deskripsi_paket ?? null,
        ];
    }
}
