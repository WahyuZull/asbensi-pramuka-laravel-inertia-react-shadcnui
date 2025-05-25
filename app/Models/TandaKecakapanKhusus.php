<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TandaKecakapanKhusus extends Model
{
    protected $guarded = ['id'];

    protected $fillable = ['nama', 'slug'];

    public function siswa() {
        return $this->belongsToMany(Siswa::class, 'siswa_has_tkk');
    }
}
