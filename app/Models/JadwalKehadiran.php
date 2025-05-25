<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalKehadiran extends Model
{
    protected $guarded = ['id'];

    protected $fillable = [
        'hari',
        'tanggal',
        'mulai_absen',
        'selesai_absen',
        'kelas_id',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'mulai_absen' => 'datetime:H:i',
        'selesai_absen' => 'datetime:H:i',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }
}
