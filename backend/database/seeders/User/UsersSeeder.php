<?php

namespace Database\Seeders\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                "name" => "Dalibor Jovanovski",
                "email" => "dalibor@test.com",
                "password" => "Dalibor123",
                "country" => "North Macedonia",
                "adress" => "Kratovo",
                "phone" => "38970232222",
                "gender" => "male",
                "role" => "admin",
            ],
             [
                "name" => "Sara Tanevska Jovanovska",
                "email" => "sarchito@test.com",
                "password" => "Sarchito123",
                "country" => "North Macedonia",
                "adress" => "Bitola",
                "phone" => "389702111111",
                "gender" => "female",
                "role" => "admin",
            ],
        ];

        foreach($users as $user) {
            User::create([
                "name" => $user['name'],
                "email" => $user["email"],
                "password" => Hash::make($user["password"]),
                "country" => $user["country"],
                "adress" => $user["adress"],
                "phone" => $user["phone"],
                "gender" => $user["gender"],
                "role" => $user["role"],
            ]);
        }
    }
}
