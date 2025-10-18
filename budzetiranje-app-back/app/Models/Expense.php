<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'description',
        'payer_user_id',
        'category_id'
    ];
    public function payer(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function debtors()
    {
    return $this->belongsToMany(User::class)
                ->withPivot('amount_owed')
                ->withTimestamps();
    }

    public function category(){
        return $this->belongsTo(Category::class,'category_id');
    }

    public function users(){
        return $this->belongsToMany(User::class)
                    ->withPivot('amount_owed')
                    ->withTimestamps();
    }
}
