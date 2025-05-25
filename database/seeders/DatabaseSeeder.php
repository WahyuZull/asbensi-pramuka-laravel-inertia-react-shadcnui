<?php

namespace Database\Seeders;

use App\Models\GolonganPramuka;
use App\Models\Kelas;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            KelasSeeder::class,
            GolonganPramukaSeeder::class,
            TKKSiagaSeeder::class,
        ]);
    }
}
