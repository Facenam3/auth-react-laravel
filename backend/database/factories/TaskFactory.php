<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;
use App\Models\Category;
use App\Models\Project;
use App\Models\User;
use App\Models\Status;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{

    protected $model = Task::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck("id")->toArray();
        $projects = Project::pluck("id")->toArray();
        $categories = Category::pluck("id")->toArray();
        $statuses = Status::pluck("id")->toArray();

        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(2),
            'project_id' => $this->faker->randomElement($projects),
            'category_id' => $this->faker->optional()->randomElement($categories),
            'created_by' => $this->faker->randomElement($users),
            "assigned_to" =>$this->faker->optional()->randomElement($users),
            "completed_by" => $this->faker->optional()->randomElement($users),
            'status_id' => $this->faker->randomElement($statuses),
        ];
    }
}
