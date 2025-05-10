<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('citas')) {
            Schema::create('citas', function (Blueprint $table) {
                $table->id();
                $table->foreignId('cliente_id')->constrained('usuarios')->onDelete('cascade');
                $table->foreignId('empresa_id')->constrained('empresas')->onDelete('cascade');
                $table->foreignId('servicio_id')->constrained('servicios')->onDelete('cascade');
                $table->date('fecha_cita');
                $table->enum('estado', ['pendiente', 'aceptada', 'rechazada'])->default('pendiente');
                $table->text('mensaje')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
