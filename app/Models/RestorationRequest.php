<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestorationRequest extends Model
{
    protected $guarded = [];

    public function documents()
    {
        return $this->hasMany(RestorationDocument::class);
    }

    public function progress()
    {
        return $this->hasMany(RestorationProgress::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
