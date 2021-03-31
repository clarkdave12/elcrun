<?php

namespace Database\Seeders;

use App\Models\ElectionStatus;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories;

class ElectionStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ElectionStatus::factory()->create([
            'id' => 1,
            'name' => 'building'
        ]);

        ElectionStatus::factory()->create([
            'id' => 2,
            'name' => 'running'
        ]);

        ElectionStatus::factory()->create([
            'id' => 3,
            'name' => 'completed'
        ]);


    }
}
