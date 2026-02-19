<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Task;

class Project extends Model
{
     use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'due_date',
        'user_id',
        'status_id'
    ];

    public function tasks() {
        return $this->hasMany(Task::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function scopeSearch($query, ?string $term) {
        $term = trim((string) $term);

        if($term === "") {
            return $query;
        }

        return $query->where(function($q) use ($term){
            $q->where("name", "like", "%{$term}%")
            ->orWhere("description", "like", "%{$term}%");
        });
    }

    public function scopeStatus($query, ?string $status_id) {
        if(!$status_id) {
            return $query;
        }

        return $query->where("status_id", $status_id);
    }
}
