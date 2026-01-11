<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\Models\User;
use App\Models\Status;
use App\Models\Project;

class ProjectApiTest extends TestCase
{

    use RefreshDatabase;

    protected $user;
    protected $status;

    protected function setUp() : void {
        parent::setUp();

        $this->user = User::factory()->create([
            'country' => "North Macedonia",
            "gender" => "male",
            "adress" => "Skopje",
            "phone" => "38970000000",
        ]);

        $this->status = Status::factory()->create();

        Sanctum::actingAs($this->user);
    }

    public function test_user_can_create_project() {

        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/project/store', [
            'name' => "Test Project",
            "description" => "Test Description",
            "start_date" => now()->toDateString(),
            "end_date" => null,
            "due_date" => null,
            "user_id" => $this->user->id,
            "status_id" => $this->status->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas("projects", [
            'name' => "Test Project",
            'user_id' => $this->user->id,
            "status_id" => $this->status->id,
        ]);

        
    }
    public function test_user_can_view_project(){
        $project = Project::factory()->create([
                'user_id' => $this->user->id,
                "status_id" => $this->status->id,
        ]);

        $response = $this->getJson("/api/project/show/{$project->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'name' => $project->name,
            ]);
        }

    public function test_user_can_update_project() {

        $project = Project::factory()->create([
            'user_id' => $this->user->id,
            'status_id' => $this->status->id,
        ]);

        $response = $this->putJson("/api/project/update/{$project->id}", [
            'name' => "Updated Project Name",
            "description" => $project->description,
            "start_date" => $project->start_date,
            "end_date" => $project->end_date,
            "due_date" => $project->due_date,
            'user_id' => $this->user->id,
            'status_id' => $this->status->id,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            "name" => "Updated Project Name",
        ]);
    }

    public function test_user_can_soft_delete_project() {
        $project = Project::factory()->create([
            'user_id' => $this->user->id,
            'status_id' => $this->status->id,
        ]);

        $response = $this->deleteJson("/api/project/delete/{$project->id}");
        $response->assertStatus(200);
    

        $this->assertSoftDeleted("projects", [
            "id" => $project->id,
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
