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
        Schema::table('pengaduan_gangguan', function (Blueprint $table) {
            $table->string('foto_kendala')->nullable()->after('deskripsi_masalah');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengaduan_gangguan', function (Blueprint $table) {
            $table->dropColumn('foto_kendala');
        });
    }
};
