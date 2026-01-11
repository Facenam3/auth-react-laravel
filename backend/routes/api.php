<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserApiController;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix("users")->group(function() {
    Route::post("/store", [UserApiController::class, "store"]);
    Route::patch("/edit/{id}", [UserApiController::class , "editUser"]);
    Route::get("/show/{id}", [UserApiController::class, "showUser"]);
});

Route::post("/login", [UserApiController::class, "login"]);
Route::post("/logout", [UserApiController::class, "logout"])
->middleware("auth:sanctum");

Route::prefix("status")->group(function() {
    Route::post("/store", [StatusController::class, "store"]);
    Route::get("/show/{id}", [StatusController::class, "show"]);
    Route::get("/edit/{id}", [StatusController::class, "edit"]);
    Route::post("/update/{id}", [StatusController::class, "update"]);
    Route::delete("/delete/{id}", [StatusController::class, "destroy"]);
})->middleware("auth:sanctum");


Route::prefix("category")->group(function() {
    Route::post("/store", [CategoryController::class, "store"]);
    Route::get("/show/{id}", [CategoryController::class, "show"]);
    Route::get("/edit/{id}", [CategoryController::class, "edit"]);
    Route::post("/update/{id}", [CategoryController::class, "update"]);
    Route::delete("/delete/{id}", [CategoryController::class, "destroy"]);
})->middleware('auth:sanctum');


Route::prefix("project")->group(function(){
    Route::post("/store", [ProjectController::class, "store"]);
    Route::get("/show/{id}", [ProjectController::class, 'show']);
    Route::get("/edit/{id}", [ProjectController::class, "edit"]);
    Route::put("/update/{id}", [ProjectController::class, "update"]);
    Route::delete("/delete/{id}", [ProjectController::class, "destroy"]);
})->middleware("auth:sanctum");