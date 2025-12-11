<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoredFile extends Model
{
    protected $fillable = [
        'title_lv',
        'title_en',
        'path',
        'mime_type',
        'size',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
    ];
    
    public function url()
    {
        return asset('storage/' . $this->path);
    }
}
