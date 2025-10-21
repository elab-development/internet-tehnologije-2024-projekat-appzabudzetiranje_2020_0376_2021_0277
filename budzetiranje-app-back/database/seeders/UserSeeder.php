<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            "name"=> "Aleksa",
            "email"=> "aleksa@gmail.com",
            'email_verified_at' => now(), 
            'remember_token' => Str::random(10),
            "password"=> bcrypt("aleksaaleksa"),
        ]);

        User::create([
            "name"=> "Milan",
            "email"=> "milan@gmail.com",
            'email_verified_at' => now(), 
            'remember_token' => Str::random(10),
            "password"=> bcrypt("milanmilan"),
        ]);

        User::create([
            "name"=> "Veljko",
            "email"=> "vuceta@estiem.org",
            'email_verified_at' => now(), 
            'remember_token' => Str::random(10),
            "password"=> bcrypt("veljkoveljko"),
        ]);

         User::create([
            "name"=> "Mihajlo",
            "email"=> "mixer@uiuxer.png",
            'email_verified_at' => now(), 
            'remember_token' => Str::random(10),
            "password"=> bcrypt("mihajlomihajlo"),
        ]);

        
    }
}
