<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormCode extends Model
{
    protected $table = 'form_code';

    protected $fillable = [
        'code',
        'user_created',
        'expiration_date',
        'uses'
    ];
}
