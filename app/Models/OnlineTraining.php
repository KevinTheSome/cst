<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OnlineTraining extends Model
{
    protected $fillable = [
        'title',
        'description',
        'url',
        'starts_at',
        'ends_at',
        'is_active',
    ];

    protected $casts = [
        'title' => 'array',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function codes()
    {
        return $this->hasMany(OnlineCode::class);
    }
}
