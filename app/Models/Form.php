<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{

    protected $table = 'forms';

    protected $fillable = [
        'code',
        'title',
        'data',
    ];

    protected $casts = [
        'title' => 'array',
        'data' => 'array',
    ];

    public function getFieldsAttribute()
    {
        return $this->data['fields'] ?? [];
    }
    public function formType(){
        return $this->hasOne(FormType::class);
    }

    public function codes()
    {
        return $this->hasMany(FormCode::class, 'form_id', 'id');
    }

}
