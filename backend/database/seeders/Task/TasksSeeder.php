<?php

namespace Database\Seeders\Task;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::factory()
        ->count(5)
        ->open()
        ->create();

        Task::factory(3)
        ->count(3)
        ->inProgress()
        ->create();

        Task::factory(2)
        ->count(2)
        ->completed()
        ->create();
    }
}
