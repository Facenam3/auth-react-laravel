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

        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(2),
            'project_id' => Project::factory(),
            'category_id' => Category::factory(),
            'created_by' => User::factory(),
            "assigned_to" => User::factory(),
            "completed_by" => null,
            'status_id' => Status::open()->id,
        ];
    }

        public function open()
        {
            return $this->state(fn () => [
                'status_id' => Status::open()->id,
                'assigned_to' => null,
                'completed_by' => null,
            ]);
        }

     public function inProgress(): static
    {
        return $this->state(function () {
            $user = User::factory()->create();

            return [
                'assigned_to' => $user->id,
                'status_id' => Status::inProgress()->id,
            ];
        });
    }

    public function completed(): static
    {
        return $this->state(function () {
            $user = User::factory()->create();

            return [
                'assigned_to' => $user->id,
                'completed_by' => $user->id,
                'status_id' => Status::completed()->id,
            ];
        });
    }
}
