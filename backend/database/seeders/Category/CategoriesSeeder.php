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
        $categories = [
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
                "name" => "Testing",
            ],
        ];

        foreach($categories as $data) {
            Category::create([
                "name" => $data["name"],
            ]);
        }
    }
}
