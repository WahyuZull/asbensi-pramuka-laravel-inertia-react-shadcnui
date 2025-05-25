<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $guruRole = Role::where('name', 'guru')->first();
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => Hash::make('adminpass'),
        ])->assignRole($adminRole);

        User::create([
            'name' => 'Pembina Satu',
            'email' => 'pembina-satu@mail.com',
            'password' => Hash::make('pembinasatupass'),
        ])->assignRole($guruRole);
    }
}
