<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

#[Fillable(['kode_pengaduan', 'id_pengguna', 'id_teknisi', 'kategori_pengaduan', 'tanggal_pengaduan', 'deskripsi_masalah', 'status_penanganan'])]
class PengaduanGangguan extends Model
{
    use SoftDeletes;

    protected $table = 'pengaduan_gangguan';

    public function pengguna(): BelongsTo
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna');
    }

    public function teknisi(): BelongsTo
    {
        return $this->belongsTo(Teknisi::class, 'id_teknisi');
    }

    protected static function booted(): void
    {
        static::creating(function ($pengaduan) {
            if (empty($pengaduan->kode_pengaduan)) {
                $pengaduan->kode_pengaduan =
                    'GNG-'.strtoupper(Str::random(6));
            }
        });
    }
}
