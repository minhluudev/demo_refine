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
        Schema::create('posts', function (Blueprint $table) {
            $table->id(); // Khóa ngoại
            $table->foreignId('category_id')
                ->constrained('categories')   // liên kết đến bảng 'categories'
                ->onUpdate('cascade')         // cập nhật id category => cập nhật theo
                ->onDelete('cascade');        // xóa category => xóa luôn posts
            $table->string('title');
            $table->text('content')->nullable();
            $table->json('tags')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
