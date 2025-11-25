<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormType extends Model
{
    protected $fillable = ['form_id', 'type'];

    public function form(){
        return $this->belongsTo(Form::class);
    }
}
