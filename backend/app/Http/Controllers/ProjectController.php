<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\ProjectRequest;
use App\Http\Requests\Project\SearchProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\Status;

class ProjectController extends Controller
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
    public function store(ProjectRequest $request)
    {
        $project = Project::create([
            'name' => $request->name,
            "description" => $request->description,
            "start_date" => $request->start_date,
            "end_date" => $request->end_date,
            'due_date' => $request->due_date,
            "user_id" => $request->user_id,
            "status_id" => $request->status_id,
        ]);

        return response()->json(data: [
            "project" => $project,
            "message" => "Successfully created a project!"
        ], status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = Project::findOrFail($id);

        return response()->json(data: [
            "project" => $project,
            "message" => "Successfully showing the project"
        ], status: 200);
    }

    public function allProjects(SearchProjectRequest $request) {

        $status_id = Status::where("name", $request->query("status"))->value("id");

        $projects = Project::query()
        ->search($request->query("search"))
        ->status($status_id)
        ->with(['user', 'status', 'tasks'])
        ->orderByDesc("id")
        ->paginate(10);

        return response()->json([
            'projects' => $projects,
            'message' => "Showing all projects",
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $project = Project::findOrFail($id);

        return response()->json(data: [
            "project" => $project,
            "message" => "Successfuly editing project",
        ], status: 200);
    }

    public function filterByStatus($statusName) {
        $status = Status::where("name", $statusName)->firstOrFail();
        $projects = Project::where("status_id", $status->id)->get();

        return response()->json(data: $projects);
     }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, $id)
    {
        $project = Project::findOrFail($id);

        $project->update([
            'name' => $request->name,
            "description" => $request->description,
            "start_date" => $request->start_date,
            "end_date" => $request->end_date,
            "due_date" => $request->due_date,
            "user_id" => $request->user_id,
            "status_id" => $request->status_id,
        ]);

        return response()->json(data: [
            "project" => $project,
            "message" => "Successfully updated the project",
        ], status: 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        $project->delete();

        return response()->json(data: [
            "message" => "Project archived successfully.",
        ], status: 200);
    }
}
