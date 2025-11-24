<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormCode extends Model
{
    protected $table = 'form_code';

    protected $fillable = [
        'code',
        'user_created',
        'expiration_date',
        'uses',
        'form_id',
    ];

    protected $casts = [
        'expiration_date' => 'datetime',
        'uses' => 'integer',
    ];

    /**
     * The admin user who created this code.
     * Note: we store the user id in `user_created` (not standard `user_id`), so specify the foreign key.
     */
    public function admin(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Admin::class, 'user_created');
    }
     public function form()
    {
        
        return $this->belongsTo(Form::class, 'form_id', 'id');
    }
}
