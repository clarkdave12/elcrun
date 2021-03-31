<?php

namespace Database\Factories;

use App\Models\ElectionStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class ElectionStatusFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ElectionStatus::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => 123,
            'name' => 'test'
        ];
    }
}
