<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestorationDocument extends Model
{
    protected $guarded = [];

    public function restorationRequest()
    {
        return $this->belongsTo(RestorationRequest::class);
    }
}
