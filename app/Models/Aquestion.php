<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aquestion extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function achoices() {
        return $this->hasMany(Achoice::class, 'aquestion_id', 'id');
    }

}
