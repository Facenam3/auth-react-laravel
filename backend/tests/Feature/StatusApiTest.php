<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Status;

class StatusApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_store_status() {
        $response = $this->postJson("/api/status/store", [
            'name' => "Test Status",
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas("statuses", [
            'name' => "Test Status",
        ]);
    }

    public function test_user_can_view_status(){
        $status = Status::factory()->create();

        $response = $this->getJson("/api/status/show/{$status->id}");

        $response->assertStatus(200)
        ->assertJsonFragment([
            'name' => $status->name,
        ]);
    }

    public function test_user_can_update_project() {
        $status = Status::factory()->create();

        $response = $this->putJson("/api/status/update/{$status->id}", [
            'name' => "Updated Status Name",
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('statuses', [
            "name" => "Updated Status Name",
        ]);
    }

    public function test_user_can_soft_delete_status() {
        $status = Status::factory()->create();

        $response = $this->deleteJson("/api/status/delete/{$status->id}");
        $response->assertStatus(200);

        $this->assertDatabaseMissing("statuses", [
            "id" => $status->id,
        ]);
    }

    /**
     * A basic feature test example.
     */
    // public function test_example(): void
    // {
    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }
}
