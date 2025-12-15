<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = ['online_training_id', 'score'];
    public function lecture()
    {
        return $this->belongsTo(OnlineTraining::class);
    }
}
