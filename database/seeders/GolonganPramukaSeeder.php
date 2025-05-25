<?php

namespace Database\Seeders;

use App\Models\GolonganPramuka;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GolonganPramukaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GolonganPramuka::insert([
            [
                'nama_golongan' => 'Siaga',
                'slug' => 'siaga',
            ],
            [
                'nama_golongan' => 'Penggalang',
                'slug' => 'penggalang',
            ]
        ]);
    }
}
