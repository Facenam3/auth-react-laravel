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

    protected static ?array $statusIds = null;

    protected static function statusIds() : array {
        if (static::$statusIds){
            return static::$statusIds;
        }

        static::$statusIds = [
            'open'        => Status::task()->named('open')->value('id'),
            'in_progress' => Status::task()->named('in_progress')->value('id'),
            'reviewed'    => Status::task()->named('reviewed')->value('id'),
            'completed'   => Status::task()->named('completed')->value('id'),
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
        $ids = static::statusIds();

        return [
            'title'       => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(2),

            'project_id'  => Project::factory(),
            'category_id' => Category::inRandomOrder()->value('id'),

            'created_by'  => User::factory(),
            'assigned_to' => User::factory(),
            'completed_by'=> null,

            'status_id'   => $ids['open'], 
        ];
    }

    public function open()
    {
        $ids = static::statusIds();

        return $this->state(fn () => [
            'status_id' => $ids["open"],
            'assigned_to' => null,
            'completed_by' => null,
        ]);
    }

    public function inProgress(): static
    {
        $ids = static::statusIds();

        return $this->state(fn () => [
            'status_id'    => $ids['in_progress'],
            'completed_by' => null,
        ]);
    }

    public function reviewed(): static
    {
        $ids = static::statusIds();

        return $this->state(fn () => [
            'status_id'    => $ids['reviewed'],
            'completed_by' => null,
        ])->afterCreating(function (Task $task) {
            if (!$task->assigned_to) {
                $user = User::factory()->create();
                $task->assigned_to = $user->id;
            }

            $task->save();
        });
    }


    public function completed(): static
    {
        $ids = static::statusIds();

        return $this->state(fn () => [
            'status_id' => $ids['completed'],
        ])->afterCreating(function (Task $task) {
            if (!$task->assigned_to) {
                $user = User::factory()->create();
                $task->assigned_to = $user->id;
            }

            $task->completed_by = $task->assigned_to;
            $task->save();
        });
    }
}
