<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestorationProgressPhoto extends Model
{
    protected $guarded = [];

    public function restorationProgress()
    {
        return $this->belongsTo(RestorationProgress::class);
    }
}
