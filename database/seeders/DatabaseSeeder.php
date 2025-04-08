<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Admin1',
        //     'email' => 'admin@example.com',
        //     'password' => bcrypt('admin123'),
        //     'email_verified_at' => now(),
        //     'is_admin' => true
        // ]);
        User::factory(15)->create();
    }
}
