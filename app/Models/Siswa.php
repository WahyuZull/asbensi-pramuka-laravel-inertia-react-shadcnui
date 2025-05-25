<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasUlids;

    protected $guarded = ['id'];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function golonganPramuka()
    {
        return $this->belongsTo(GolonganPramuka::class);
    }

    public function kehadiran()
    {
        return $this->hasMany(Kehadiran::class);
    }

    public function tandaKecakapanKhusus()
    {
        return $this->belongsToMany(TandaKecakapanKhusus::class, 'siswa_has_tkk');
    }
}
