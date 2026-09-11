<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengaduan_gangguan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->nullable()->constrained('pengguna')->onDelete('set null');
            $table->foreignId('id_teknisi')->nullable()->constrained('teknisi')->onDelete('set null');
            $table->enum('kategori_pengaduan', [ 'mati_total',  'koneksi_lambat', 'kabel_putus', 'perangkat_rusak', 'lainnya'])->default('lainnya');
            $table->text('deskripsi_masalah');
            $table->enum('status_penanganan', ['pending', 'sedang_perjalanan', 'selesai'])->default('pending');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduan_gangguan');
    }
};