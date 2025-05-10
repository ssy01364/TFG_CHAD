<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('reseñas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('usuarios')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('empresa_id')->constrained('empresas')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('cita_id')->constrained('citas')->onDelete('cascade')->onUpdate('cascade');
            $table->tinyInteger('puntuacion')->unsigned()->default(1)->comment('1 a 5');
            $table->text('comentario')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('reseñas');
    }
};
