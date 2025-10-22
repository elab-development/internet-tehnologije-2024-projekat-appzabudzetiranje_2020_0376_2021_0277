<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Expense;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Expense::create([
            'description' => 'Bek akiba sa drugarima',
            'category_id' => 1,
            'user_id' => 1,
            'amount'=>7000
        ]);

        Expense::create([
            'description' => 'Hrana u burito madreu',
            'category_id' => 2,
            'user_id' => 3,
            'amount'=>2500
        ]);
       

        Expense::create([
            'description' => 'Voznja do Novog Sada',
            'category_id' => 3,
            'user_id' => 2,
            'amount'=>4400
        ]);
       
    }
}
