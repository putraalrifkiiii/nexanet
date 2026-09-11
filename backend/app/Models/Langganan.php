<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['id_pengguna', 'id_paket', 'tanggal_mulai', 'tanggal_berakhir', 'status_langganan', 'installation_cost'])]
class Langganan extends Model
{
    use SoftDeletes;

    protected $table = 'langganan';

    public function pengguna(): BelongsTo
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna');
    }

    public function paketWifi(): BelongsTo
    {
        return $this->belongsTo(PaketWifi::class, 'id_paket');
    }

    public function pembayaran(): HasMany
    {
        return $this->hasMany(Pembayaran::class, 'id_langganan');
    }

    public function teknisi()
    {
        return $this->belongsTo(Teknisi::class, 'id_teknisi');
    }
}
