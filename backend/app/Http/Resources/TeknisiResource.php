<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeknisiResource extends JsonResource
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
            'nama_teknisi' => $this->teknisi?->nama_teknisi,
            'no_telepon' => $this->teknisi?->no_telepon,
            'status_ketersediaan' => $this->teknisi?->status_ketersediaan,
        ];
    }
}
