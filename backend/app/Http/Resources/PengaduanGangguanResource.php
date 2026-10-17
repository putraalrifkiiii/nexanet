<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengaduanGangguanResource extends JsonResource
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
            'kode_pengaduan' => $this->kode_pengaduan,
            'tanggal_pengaduan' => $this->tanggal_pengaduan,
            'kategori_pengaduan' => $this->kategori_pengaduan,
            'deskripsi_masalah' => $this->deskripsi_masalah,
            'foto_kendala' => $this->foto_kendala ? asset('storage/' . $this->foto_kendala) : null,
            'status_penanganan' => $this->status_penanganan,
            'pengguna' => [
                'id_pengguna' => $this->id_pengguna,
                'nama' => $this->pengguna?->nama,
                'alamat' => $this->pengguna?->alamat,
                'no_telepon' => $this->pengguna?->no_telepon,
                'email' => $this->pengguna?->email,
            ],
            'teknisi' => [
                'id_teknisi' => $this->id_teknisi,
                'nama_teknisi' => $this->teknisi?->nama_teknisi,
                'no_telepon' => $this->teknisi?->no_telepon,
                'status_ketersediaan' => $this->teknisi?->status_ketersediaan,
            ],
        ];
    }
}
