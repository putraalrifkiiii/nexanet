<?php

namespace App\Jobs;

use App\Models\Pembayaran;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class MarkPaymentAsFailed implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $pembayaranId,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $pembayaran = Pembayaran::find($this->pembayaranId);

        if ($pembayaran && $pembayaran->status_pembayaran === 'Pending' && ! $pembayaran->bukti_pembayaran) {
            $pembayaran->update(['status_pembayaran' => 'Gagal']);
        }
    }
}
