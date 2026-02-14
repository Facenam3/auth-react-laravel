<?php

namespace Database\Seeders\Task;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\Status;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::factory()->count(10)->open()->create();
        Task::factory()->count(5)->inProgress()->create();
        Task::factory()->count(5)->completed()->create();
    }
}
