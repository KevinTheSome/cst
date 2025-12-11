<?php

// app/Models/CountryPulseMetric.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CountryPulseMetric extends Model
{
    protected $fillable = [
        'metric',
        'label',
        'country_code',
        'value',
        'occurred_at',
    ];

    protected $casts = [
        'occurred_at' => 'datetime',
    ];
}

