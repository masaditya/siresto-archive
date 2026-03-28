<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestorationProgress extends Model
{
    protected $table = 'restoration_progresses';
    protected $guarded = [];


    public function restorationRequest()
    {
        return $this->belongsTo(RestorationRequest::class);
    }

    public function photos()
    {
        return $this->hasMany(RestorationProgressPhoto::class);
    }
}
