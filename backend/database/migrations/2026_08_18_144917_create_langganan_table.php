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
        Schema::create('langganan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pengguna')->constrained('pengguna')->onDelete('restrict');
            $table->foreignId('id_paket')->constrained('paket_wifi')->onDelete('restrict');
            $table->date('tanggal_mulai')->nullable();
            $table->date('tanggal_berakhir')->nullable();
            $table->string('status_langganan')->default('menunggu_pembayaran');
            $table->decimal('biaya_pemasangan', 10, 2)->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('langganan');
    }
};
