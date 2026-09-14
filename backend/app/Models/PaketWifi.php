<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['nama_paket', 'slug', 'kecepatan_mbps', 'harga', 'biaya_pemasangan', 'deskripsi_paket'])]
class PaketWifi extends Model
{
    use SoftDeletes;

    protected $table = 'paket_wifi';

    protected $guarded = ['id'];

    public function setNamaPaketAttribute(string $value): void
    {
        $this->attributes['nama_paket'] = $value;
        $this->attributes['slug'] = str()->slug($value);
    }

    public function langganan(): HasMany
    {
        return $this->hasMany(Langganan::class, 'id_paket');
    }
}
