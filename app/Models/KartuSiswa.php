<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class KartuSiswa extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $guarded = ['id'];
    protected $fillable = [
        'cover',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover-kartu-siswa')
            ->useDisk('public')
            ->singleFile(); // opsional, tergantung kebutuhan
    }
}
