<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        "type",
    ];

    public function tasks() {
        return $this->hasMany(Task::class);
    }

    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function scopeTask($q) {
        return $q->where('type', 'task');
    }

    public function scopeProject($q) {
        return $q->where("type", "project");
    }

    public function scopeName($q, string $name) {
        return $q->where("name", $name);
    }
}
