<?php

namespace Database\Seeders\Status;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::insert([
            [
                'name' => 'open',
                "type" => "tasks",
            ],
            [
                'name' => 'in_progress',
                'type' => 'tasks',
            ],
            [
                'name' => 'reviewed',
                'type' => 'tasks'
            ],
            [
                'name' => 'completed',
                'type' => 'tasks',
            ],
            [
                'name' => 'planning',
                'type' => 'projects',
            ],
            [
                'name' => 'active',
                'type' => 'projects',
            ],
            [
                'name' => 'completed',
                'type' => 'projects',
            ],
            [
                'name' => 'archived',
                'type' => 'projects',
            ],
        ]);
    }
}
