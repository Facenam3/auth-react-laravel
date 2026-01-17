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
            ['name' => 'open'],
            ['name' => 'in_progress'],
            ['name' => 'completed'],
        ]);
    }
}
