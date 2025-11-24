<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{

    protected $table = 'form';

    protected $fillable = [
        'code',
        'title',
        'results',
    ];

    protected $casts = [
        'title' => 'array',
        'results' => 'array',
    ];

    public function getFieldsAttribute()
    {
        return $this->results['fields'] ?? [];
    }

    public function getTitleAttribute($value)
    {
        // in case title is inside results
        return $this->results['title'] ?? $value;
    }
}
