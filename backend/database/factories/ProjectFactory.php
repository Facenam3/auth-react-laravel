<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    protected $model = Project::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->sentence(4),
            "description" => $this->faker->paragraph(2),
            'start_date' => $this->faker->date(),
            'end_date' => null,
            "due_date" => null,
            'user_id' => User::factory(),
            'status_id' => Status::factory(),
        ];
    }
}
