<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create([
            'name' => $request->name
        ]);

        return response()->json(data: [
            "category" => $category,
            "message" => "Successfully created category!",
        ], status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);

        return response()->json([
            "category" => $category,
            "message" => "Showing Category!"
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $category = Category::findOrFail($id);

        return response()->json(data: [
            "category" => $category,
            "message" => "Editing this category!"
        ], status: 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);

        $category->update([
            "name" => $request->name
        ]);

        return response()->json(data: [
            "category" => $category,
            "message" => "Succesfully updated category!",
        ], status: 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json(data: [
            "message" => "Successfully deleted a category!"
        ] , status: 200);
    }
}
