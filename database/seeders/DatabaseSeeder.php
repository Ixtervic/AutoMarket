<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Location;
use App\Models\Product;
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
        Product::factory(20)->create();

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
