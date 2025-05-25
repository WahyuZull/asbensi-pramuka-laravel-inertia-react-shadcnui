<?php

namespace Database\Seeders;

use App\Models\TandaKecakapanKhusus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TKKSiagaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TandaKecakapanKhusus::insert([
            [
                'nama' => 'Pertolongan Pertama Pada Kecelakaan (P3K)',
                'slug' => 'pertolongan-pertama-pada-kecelakaan-p3k',
            ],
            [
                'nama' => 'Pengatur Ruangan',
                'slug' => 'pengatur-ruangan',
            ],
            [
                'nama' => 'Pengamat',
                'slug' => 'pengamat',
            ],
            [
                'nama' => 'Juru Masak',
                'slug' => 'juru-masak',
            ],
            [
                'nama' => 'Berkemah',
                'slug' => 'berkemah',
            ],
            [
                'nama' => 'Penabung',
                'slug' => 'penabung',
            ],
            [
                'nama' => 'Penjahit',
                'slug' => 'penjahit',
            ],
            [
                'nama' => 'Juru Kebun',
                'slug' => 'juru-kebun',
            ],
            [
                'nama' => 'Pengaman Kampung',
                'slug' => 'pengaman-kampung',
            ],
            [
                'nama' => 'Gerak Jalan',
                'slug' => 'gerak-jalan',
            ]
        ]);
    }
}
