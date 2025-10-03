<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();

        return [
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'title' => $title,
            'excerpt' => $this->faker->sentence(12),
            'body' => $this->faker->paragraph(5),
            'published_at' => $this->faker->optional()->dateTimeBetween('-1 year', 'now'),
            'category_id' => 1,
            'user_id' => User::factory(),
        ];
    }
}
