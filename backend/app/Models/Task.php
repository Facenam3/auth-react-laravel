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
        'created_by',
        "assigned_to",
        "completed_by",
        'status_id',
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function creator() {
        return $this->belongsTo(User::class, "created_by");
    }

    public function assignee() {
        return $this->belongsTo(User::class, "assigned_to");
    }

    public function completor() {
        return $this->belongsTo(User::class, "completed_by");
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function scopeSearch($query, ?string $term){
        $term = trim((string) $term);

        if($term === ""){
            return $query;
        }

        return $query->where(function($q) use ($term){
            $q->where("title", "like", "%{$term}%")
            ->orWhere("description", "like", "%{$term}%")
            ->orWhere("assigned_to", "like", "%{$term}");
        });
    }
}
