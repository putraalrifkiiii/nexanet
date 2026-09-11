<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Hidden(['password', 'remember_token'])]
class Pengguna extends Authenticatable
{
    /** @use HasFactory<PelangganFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $table = 'pengguna';

    protected $fillable = ['nama', 'alamat', 'no_telepon', 'email', 'password'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function pembayaran(): HasMany
    {
        return $this->hasMany(Pembayaran::class, 'id_pengguna');
    }

    public function langganan(): HasMany
    {
        return $this->hasMany(Langganan::class, 'id_pengguna');
    }

    public function pengaduanGangguan(): HasMany
    {
        return $this->hasMany(PengaduanGangguan::class, 'id_pengguna');
    }

    public function getStatusSaatIniAttribute(): string
    {
        // Mencari data langganan milik pengguna ini, diurutkan dari yang paling baru
        $langgananTerbaru = $this->langganan()->latest()->first();

        // Jika dia punya data langganan, kembalikan statusnya. Jika belum punya, tampilkan 'belum ada'
        return $langgananTerbaru ? $langgananTerbaru->status_langganan : 'belum ada';
    }
}
