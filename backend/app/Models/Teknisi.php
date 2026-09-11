<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['nama_teknisi', 'no_telepon', 'status_ketersediaan'])]
class Teknisi extends Model
{
    use SoftDeletes;

    protected $table = 'teknisi';

    public function pengaduanGangguan(): HasMany
    {
        return $this->hasMany(PengaduanGangguan::class, 'id_teknisi');
    }
}