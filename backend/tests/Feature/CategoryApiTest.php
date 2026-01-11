<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Category;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_store_category() {
        $response = $this->postJson("/api/category/store", [
            'name' => "Test Category",
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas("categories", [
            'name' => "Test Category",
        ]);
    }

    public function test_user_can_view_category() {
        $category = Category::factory()->create();

        $response = $this->getJson("/api/category/show/{$category->id}");

        $response->assertStatus(200)
        ->assertJsonFragment([
            'name' => $category->name,
        ]);
    }

    public function test_user_can_update_category() {
        $category = Category::factory()->create();

        $response = $this->putJson("/api/category/update/{$category->id}", [
            "name" => "Updated Category Name",
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas("categories", [
            'name' => "Updated Category Name",
        ]);
    }

    public function test_user_can_delete_category() {
        $category = Category::factory()->create();

        $response = $this->deleteJson("/api/category/delete/{$category->id}");
        $response->assertStatus(200);

        $this->assertDatabaseMissing("categories", [
            'id' => $category->id,
        ]);
    }
}
