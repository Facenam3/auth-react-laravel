<?php

namespace Database\Seeders\Category;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::insert(
            [
                [
                    "name" => "Frontend",
                ], 
                [
                    "name" => "Backend",
                ],
                [
                    "name" => "Database",
                ],
                [
                    "name" => "QA",
                ],
                [
                    "name" => "DevOps",
                ],
            ]
        );
    }
}
