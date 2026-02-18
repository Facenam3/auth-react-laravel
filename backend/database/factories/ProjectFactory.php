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

    protected static ?array $statusIds = null;

    protected static function statusIds() : array {
        if(static::$statusIds){
            return static::$statusIds;
        }

        static::$statusIds = [
            'planning'  => Status::project()->named('planning')->value('id'),
            'active'    => Status::project()->named('active')->value('id'),
            'completed' => Status::project()->named('completed')->value('id'),
            'archived'  => Status::project()->named('archived')->value('id'),
        ];

        foreach(static::$statusIds as $name => $id) {
            if(!$id) {
                throw new \RuntimeException("Missing status row for '{$name}'. Seed statuses first.");
            }
        }

        return static::$statusIds;
    }
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
            'end_date' => $this->faker->date(),
            "due_date" => null,
            'user_id' => User::factory(),
            'status_id' => Status::project()->inRandomOrder()->value('id'),
        ];
    }
}
