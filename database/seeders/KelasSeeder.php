<?php

namespace Database\Seeders;

use App\Models\Kelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kelas::insert([
            [
                'nama_kelas' => '3 A',
                'slug' => '3-a'
            ],
            [
                'nama_kelas' => '3 B',
                'slug' => '3-b'
            ],
            [
                'nama_kelas' => '4 A',
                'slug' => '4-a'
            ],
            [
                'nama_kelas' => '4 B',
                'slug' => '4-b'
            ],
            [
                'nama_kelas' => '5 A',
                'slug' => '5-a'
            ],
            [
                'nama_kelas' => '5 B',
                'slug' => '5-b'
            ],
            [
                'nama_kelas' => '6 A',
                'slug' => '6-a'
            ],
            [
                'nama_kelas' => '6 B',
                'slug' => '6-b'
            ]
        ]);
    }
}
