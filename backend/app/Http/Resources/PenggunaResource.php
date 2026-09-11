<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PenggunaResource extends JsonResource
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
            'nama' => $this->pengguna?->nama,
            'alamat' => $this->pengguna?->alamat,
            'no_telepon' => $this->pengguna?->no_telepon,
            'email' => $this->pengguna?->email,
        ];

    }
}
