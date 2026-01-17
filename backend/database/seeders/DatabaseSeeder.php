<?php

namespace Database\Seeders;

use App\Models\Project;
use Database\Seeders\Category\CategoriesSeeder;
use Database\Seeders\Projects\ProjectSeeder;
use Database\Seeders\Status\StatusesSeeder;
use Database\Seeders\Task\TasksSeeder;
use Database\Seeders\User\UsersSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            StatusesSeeder::class, 
            UsersSeeder::class,
            ProjectSeeder::class,
            CategoriesSeeder::class,   
            TasksSeeder::class,                   
        ]);

        
    }
}
