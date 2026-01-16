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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->text("description");
            $table->foreignId("project_id")->constrained()->cascadeOnDelete();
            $table->foreignId("category_id")->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId("created_by")->constrained("users")->cascadeOnDelete();
            $table->foreignId("assigned_to")->nullable()->constrained("users")->cascadeOnDelete();
            $table->foreignId("completed_by")->nullable()->constrained("users")->cascadeOnDelete();
            $table->foreignId("status_id")->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
