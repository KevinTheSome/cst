<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OnlineCode extends Model
{
    protected $fillable = [
        'code',
        'online_training_id',
        'max_uses',
        'used_count',
        'last_used_by',
        'valid_from',
        'valid_until',
        'last_used_at',
        'is_active',
    ];

    protected $casts = [
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'last_used_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function training()
    {
        return $this->belongsTo(OnlineTraining::class, 'online_training_id');
    }

    public function isValidNow(): bool
    {
        $now = now();

        if (!$this->is_active) {
            return false;
        }

        if ($this->max_uses > 0 && $this->used_count >= $this->max_uses) {
            return false;
        }

        if ($this->valid_from && $now->lt($this->valid_from)) {
            return false;
        }

        if ($this->valid_until && $now->gt($this->valid_until)) {
            return false;
        }

        return true;
    }
}
