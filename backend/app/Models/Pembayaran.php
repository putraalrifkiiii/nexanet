<?php

namespace App\Models;

use App\Jobs\MarkPaymentAsFailed;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['id_pengguna', 'nomor_pembayaran', 'id_langganan', 'tanggal_bayar', 'total_pembayaran', 'metode_pembayaran', 'status_pembayaran', 'bukti_pembayaran'])]
class Pembayaran extends Model
{
    use SoftDeletes;

    protected $table = 'pembayaran';

    public function langganan(): BelongsTo
    {
        return $this->belongsTo(Langganan::class, 'id_langganan');
    }

    public function pengguna(): BelongsTo
    {
        return $this->belongsTo(Pengguna::class, 'id_pengguna');
    }

    public static function paymentNumber($length = 4)
    {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        do {
            $waktu = now()->format('Y-m-d').'-'.substr(str_shuffle(str_repeat($pool, 5)), 0, $length);
            $code = 'NET';
            $final = $code.'-'.$waktu;
        } while (self::where('nomor_pembayaran', $final)->exists());

        return $final;
    }

    protected static function booted()
    {
        static::saving(function ($pembayaran) {
            if ($pembayaran->bukti_pembayaran) {
                $pembayaran->status_pembayaran = 'Lunas';
            } elseif (! $pembayaran->bukti_pembayaran && $pembayaran->status_pembayaran !== 'Gagal') {
                $pembayaran->status_pembayaran = 'Pending';
            }
        });

        static::saved(function ($pembayaran) {
            // Gunakan optional() agar aman jika relasi langganannya null
            if ($pembayaran->status_pembayaran === 'Lunas') {
                optional($pembayaran->langganan)->update([
                    'status_langganan' => 'Aktif',
                    'tanggal_mulai' => $pembayaran->tanggal_bayar,
                    'installation_cost' => '150000',
                ]);
            } elseif (in_array($pembayaran->status_pembayaran, ['Gagal', 'Pending'])) {
                optional($pembayaran->langganan)->update([
                    'status_langganan' => 'Isolir',
                    'installation_cost' => 0,
                ]);
            }

            if ($pembayaran->status_pembayaran === 'Pending') {
                MarkPaymentAsFailed::dispatch($pembayaran->id)->delay(now()->addMinutes(5));
            }
        });

        static::creating(function ($pembayaran) {
            $pembayaran->nomor_pembayaran = self::paymentNumber();
        });
    }
}
