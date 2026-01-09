<?php

use App\Http\Controllers\UserApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix("users")->group(function() {
    Route::post("/store", [UserApiController::class, "store"]);
    Route::patch("/edit/{id}", [UserApiController::class , "editUser"]);
});

Route::post("/login", [UserApiController::class, "login"]);