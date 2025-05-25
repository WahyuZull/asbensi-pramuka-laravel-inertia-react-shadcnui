<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GolonganPramuka extends Model
{
    protected $guarded = ['id'];

    public function siswa()
    {
        return $this->hasMany(Siswa::class);
    }
}
