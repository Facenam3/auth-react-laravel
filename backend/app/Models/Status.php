<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public static function open(): self
    {
        return static::where('name', 'open')->firstOrFail();
    }

    public static function inProgress(): self
    {
        return static::where('name', 'in_progress')->firstOrFail();
    }

    public static function completed(): self
    {
        return static::where('name', 'completed')->firstOrFail();
    }
}
