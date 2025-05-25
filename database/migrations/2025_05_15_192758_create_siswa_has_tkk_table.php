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
        Schema::create('siswa_has_tkk', function (Blueprint $table) {
            $table->id();
            $table->foreignUlid('siswa_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tanda_kecakapan_khusus_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa_has_tkk');
    }
};
