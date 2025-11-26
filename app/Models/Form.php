<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{

    protected $table = 'forms';

    protected $fillable = [
        'code',
        'title',
        'results',
    ];

    protected $casts = [
        'title' => 'array',
        'results' => 'array',
    ];

    public function getResultsAttribute($value)
    {
        return [
            'title' => $this->title,
            'fields' => $value['fields'] ?? [],
        ];
    }

    public function getFieldsAttribute()
    {
        return $this->results['fields'] ?? [];
    }
    public function formType(){
        return $this->hasOne(FormType::class);
    }

    public function codes()
    {
        return $this->hasMany(FormCode::class, 'form_id', 'id');
    }

}
