<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Category::create([
            'name'=> 'Izlazak u klub',
            'slug'=>'Clubbing'
        ]);
        
        Category::create([
            'name'=> 'Rucak',
            'slug'=>'Lunch'
        ]);

        Category::create([
            'name'=> 'Vozenje po gradu',
            'slug'=>'Driving aroung the city'
        ]);
    }
}
