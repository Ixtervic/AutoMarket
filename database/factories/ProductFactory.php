<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->name(),
            'description' => $this->faker->text(),
            'brand_id' => Brand::factory(),
            'model' => $this->faker->name(),
            'year' => $this->faker->numberBetween(1900, (int) date('Y')),
            'mileage' => $this->faker->numberBetween(10, 1000),
            'fuel_type' => $this->faker->word(),
            'transmission' => $this->faker->word(),
            'price' => $this->faker->randomFloat(2, 0, 999999.99),
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'location_id' => Location::factory(),
        ];
    }
}
