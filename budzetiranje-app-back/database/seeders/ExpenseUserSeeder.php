<?php

namespace Database\Seeders;


use App\Models\User;
use App\Models\Expense;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseUserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Mihajlo i Veljko duguju za Ben Akibu koju je Aleksa platio
        $expense = Expense::find(1);
        $expense->users()->attach(2, ['amount_owed' => 3300]);
        $expense->users()->attach(3, ['amount_owed' => 1900]);

        //Veljko je platio hranu u burito madreu
        $expense = Expense::find(2);
        $expense->users()->attach(2, ['amount_owed' => 700]);
        $expense->users()->attach(4, ['amount_owed' => 800]);
    }
}
