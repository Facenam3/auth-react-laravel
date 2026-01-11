<?php

namespace App\Http\Controllers;

use App\Http\Requests\Status\StatusRequest;
use App\Models\Status;

class StatusController extends Controller
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
    public function store(StatusRequest $request)
    {
        $status = Status::create([
            'name' => $request->name
        ]);

        return response()->json(data: [
            "status" => $status,
            'message' => "Status created successfully!"
        ], status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $status = Status::findOrFail($id);

        return response()->json(data: [
            "status" => $status,
            "message" => "Show status!"
        ], status: 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id) 
    {
        $status = Status::findOrFail($id);

        return response()->json(data: [
            "status" => $status,
            "message" => "Edit status!"
        ], status: 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StatusRequest $request, $id)
    {
        $status = Status::findorFail($id);

        $status->update([
            'name' => $request->name
        ]);

        return response()->json(data: [
            "status" => $status,
            'message' => "Successfully updated Status!"
        ], status: 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $status = Status::findOrFail($id);

        $status->delete();

        return response()->json(data: [
            "message" => "Successfully deleted status!"
        ], status: 200);
    }
}
