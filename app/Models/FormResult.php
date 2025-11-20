<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormResult extends Model
{

    protected $table = 'form_results';

    protected $fillable = [
        'code',
        'title',
        'results',
    ];

    protected $casts = [
        'results' => 'array', // Laravel will automatically decode JSON
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
