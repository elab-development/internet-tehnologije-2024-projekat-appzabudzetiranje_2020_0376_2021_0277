<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostTestController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ExpenseController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



// Route::get('posts/{id}', [PostTestController::class, 'show']);
// Route::get('posts', [PostTestController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);
// Route::resource('posts', PostTestController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/expenses', [ExpenseController::class, 'store']);

//Ukoliko nismo ulogovani ne mozemo da pristupimo ovim rutama u ovoj grupi
Route::group(['middleware'=> ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request){
        return auth()->user();
    });
    // Route::resource('posts', PostController::class)->only(['update','store','destroy']);
    Route::post('/logout', [AuthController::class,'logout']);

});

//Ovde bilo ko moze da pristupi
// Route::resource('posts', PostController::class)->only(['index']);