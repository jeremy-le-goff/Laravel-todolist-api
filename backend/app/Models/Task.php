<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
