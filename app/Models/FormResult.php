<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormResult extends Model
{
    use HasFactory;

    protected $table = 'form_results';

    protected $fillable = [
        'code',
        'title',
        'results',
    ];

    protected $casts = [
        'results' => 'array',
    ];
}
