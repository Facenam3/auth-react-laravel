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

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
