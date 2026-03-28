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
        Schema::create('restoration_requests', function (Blueprint $table) {
            $table->id();
            $table->string('resi_number')->unique();
            $table->string('queue_number');
            $table->string('name');
            $table->string('whatsapp');
            $table->text('address');
            $table->string('archive_type');
            $table->integer('estimated_sheets');
            $table->string('status')->default('Pending'); // Pending, Verifikasi Fisik, Dikerjakan, Selesai, etc.
            $table->string('current_stage')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restoration_requests');
    }
};
