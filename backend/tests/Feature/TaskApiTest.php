<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;



class TaskApiTest extends TestCase
{   
    use RefreshDatabase;

    protected $user;
    protected $status;
    protected $category;
    protected $project;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'country' => "North Macedonia",
            "gender" => "male",
            "adress" => "Skopje",
            "phone" => "38970000000",
        ]);

        $this->status = Status::factory()->create();
        $this->project = Project::factory()->create();
        $this->category = Category::factory()->create();
        
        Sanctum::actingAs($this->user);
    }
    
    public function test_user_can_create_task() {
        Sanctum::actingAs($this->user);

        $response = $this->postJson("/api/task/store", [
            'title' => "Test Task",
            'description' => "Test Description",
            'project_id' => $this->project->id,
            'category_id' => $this->category->id,
            'created_by' => $this->user->id,
            'status_id' => $this->status->id,
        ]);
        
        $response->assertStatus(201);
        $this->assertDatabaseHas('tasks', [
            'title' => "Test Task",
            'project_id' => $this->project->id,
            'category_id' => $this->category->id,
            'created_by' => $this->user->id,
            'status_id' => $this->status->id,
        ]);
    }

    public function test_user_can_view_task() {
        $task = Task::factory()->create([
            'project_id' => $this->project->id,
            'category_id' => $this->category->id,
            'created_by' => $this->user->id,
            'status_id' => $this->status->id,
        ]);

        $response = $this->getJson("/api/task/show/{$task->id}");

        $response->assertStatus(200)
        ->assertJsonFragment([
            'title' => $task->title,
        ]);
    }

    public function test_user_can_update_task() {
        $task = Task::factory()->create([
            'project_id' => $this->project->id,
            'category_id' => $this->category->id,
            'created_by' => $this->user->id,
            "assigned_to" => null,
            "completed_by" => null,
            'status_id' => $this->status->id,
        ]);

        $response = $this->putJson("/api/task/update/{$task->id}", [
            'title' => "Updated Task Title",
            'description' => $task->description,
            'project_id' => $this->project->id,
            'category_id' => $this->category->id,
            'created_by' => $this->user->id,
            "assigned_to" => null,
            "completed_by" => null,
            'status_id' => $this->status->id,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => "Updated Task Title"
        ]);
    }

    public function test_user_can_soft_delete_task() {
        $task = Task::factory()->create([
            'project_id' => $this->project->id,
            'category_id' => $this->category->id,
            'created_by' => $this->user->id,
            'status_id' => $this->status->id,
        ]);

        $response = $this->deleteJson("/api/task/delete/{$task->id}");
        $response->assertStatus(200);

        $this->assertSoftDeleted('tasks', [
            'id' => $task->id,
        ]);
    }
}
