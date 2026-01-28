<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::middleware(
    [
        EnsureFrontendRequestsAreStateful::class, "auth:sanctum"
    ]
)->get("/user", function (Request $request) {
    return response()->json(data: [
        "user" => $request->user(),
    ]);
});

Route::prefix("users")->group(function() {
    Route::patch("/edit/{id}", [UserApiController::class , "editUser"]);
    Route::get("/show/{id}", [UserApiController::class, "showUser"]);
    Route::get("/all", [UserApiController::class, "getAllUsers"]);
})->middleware("auth:sanctum");

Route::post("/register", [UserApiController::class, "store"]);
Route::post("/login", [UserApiController::class, "login"]);
Route::post("/logout", [UserApiController::class, "logout"])
->middleware("auth:sanctum");

Route::prefix("status")->group(function() {
    Route::post("/store", [StatusController::class, "store"]);
    Route::get("/show/{id}", [StatusController::class, "show"]);
    Route::get("/show-all", [StatusController::class, 'allStatuses']);
    Route::get("/edit/{id}", [StatusController::class, "edit"]);
    Route::put("/update/{id}", [StatusController::class, "update"]);
    Route::delete("/delete/{id}", [StatusController::class, "destroy"]);
})->middleware("auth:sanctum");


Route::prefix("category")->group(function() {
    Route::post("/store", [CategoryController::class, "store"]);
    Route::get("/show-all", [CategoryController::class, 'allCategories']);
    Route::get("/show/{id}", [CategoryController::class, "show"]);
    Route::get("/edit/{id}", [CategoryController::class, "edit"]);
    Route::put("/update/{id}", [CategoryController::class, "update"]);
    Route::delete("/delete/{id}", [CategoryController::class, "destroy"]);
})->middleware('auth:sanctum');


Route::prefix("project")->group(function(){
    Route::post("/store", [ProjectController::class, "store"]);
    Route::get("/show/{id}", [ProjectController::class, 'show']);
    Route::get("/show-all", [ProjectController::class, 'allProjects']);
    Route::get("/edit/{id}", [ProjectController::class, "edit"]);
    Route::put("/update/{id}", [ProjectController::class, "update"]);
    Route::delete("/delete/{id}", [ProjectController::class, "destroy"]);
})->middleware("auth:sanctum");


Route::prefix("task")->group(function() {
    Route::post("/store", [TaskController::class, 'store']);
    Route::get("/show/{id}", [TaskController::class, 'show']);
    Route::get('/show-all', [TaskController::class, 'allTasks']);
    Route::get("/edit/{id}", [TaskController::class, 'edit']);
    Route::put("/update/{id}", [TaskController::class, "update"]);
    Route::delete("/delete/{id}", [TaskController::class, "destroy"]);

    Route::post("/{task}/assign", [TaskController::class, "assignToSelf"]);
    Route::post("/{task}/complete", [TaskController::class, "complete"]);
    Route::get("/status/{status}", [TaskController::class, "filterByStatus"]);
});