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
        Schema::create('siswas', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('nis')->nullable();
            $table->string('nama_lengkap');
            $table->string('jenis_kelamin');
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('alamat')->nullable();
            $table->string('qr_code_url')->nullable();
            $table->string('qr_code_image')->nullable();

            $table->foreignId('kelas_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('golongan_pramuka_id')->nullable()->constrained()->cascadeOnDelete();

            $table->foreignUlid('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswas');
    }
};
