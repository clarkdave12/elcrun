<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function election_status() {
        return $this->belongsTo(ElectionStatus::class);
    }

    public function voters() {
        return $this->hasMany(Voter::class);
    }

    public function questions() {
        return $this->hasMany(Question::class);
    }
}
