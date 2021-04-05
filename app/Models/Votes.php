<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Votes extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function voter() {
        return $this->belongsTo(Voter::class);
    }

    public function election() {
        return $this->belongsTo(Election::class);
    }

    public function aquestions() {
        return $this->hasMany(Aquestion::class, 'voted_id', 'id');
    }

}
