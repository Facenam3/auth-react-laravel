<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
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
    public function store(TaskRequest $request)
    {
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'project_id' => $request->project_id,
            'category_id' => $request->category_id,
            'created_by' => $request->user()->id,
            "assigned_to" => $request->assigned_to ?? null,
            "completed_by" => $request->completed_by ?? null,
            'status_id' => $request->status_id,
        ]);

        return response()->json(data: [
            'task' => $task,
            'message' => "Successfully created task!",
        ], status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $task = Task::findOrFail($id);

        return response()->json(data: [
            'task' => $task,
            'message' => "Showing task",
        ], status: 200);
    }

    public function allTasks() {
        $tasks = Task::with(['user', 'status', 'categories', 'projects'])->paginate(10);

        return response()->json(data: [
            'tasks' => $tasks,
            'message' => "Showing all tasks!",
        ], status: 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $task = Task::findOrFail($id);

        return response()->json(data: [
            "task" => $task,
            'message' => "Editing Task",
        ], status: 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);

        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            "project_id" => $request->project_id,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
            'status_id' => $request->status_id,
        ]);

        return response()->json(data: [
            'task' => $task,
            'message' => "Task updated successfully",
        ], status: 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(data: [
            'message' => "Task succesfully deleted!",
        ] , status: 200);
    }
}
