<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Category;
use App\Models\Project;
use App\Models\User;
use App\Models\Status;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'project_id',
        'category_id',
        'user_id',
        'status_id',
    ];

    public function projects() {
        return $this->belongsTo(Project::class);
    }

    public function categories() {
        return $this->belongsTo(Category::class);
    }

    public function users() {
        return $this->belongsTo(User::class);
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }
}
