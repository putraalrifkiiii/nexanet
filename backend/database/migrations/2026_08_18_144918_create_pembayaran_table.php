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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_pembayaran')->unique();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('restrict');
            $table->foreignId('id_langganan')->nullable()->constrained('langganan')->onDelete('set null');
            $table->date('tanggal_bayar')->nullable();
            $table->unsignedBigInteger('total_pembayaran');
            $table->string('metode_pembayaran');
            $table->enum('status_pembayaran', ['Pending', 'Lunas', 'Gagal'])->default('Pending');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};
