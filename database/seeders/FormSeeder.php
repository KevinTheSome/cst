<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Form;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Form::create([
            'code' => 'private',
            'title' => '{"lv":"Anketa","en":"Form"}',
            'results' => '{"fields":[{"id":"70183f96-1c34-485a-b250-c9fb6b8f01b3","label":{"lv":"Jaut\u0101jums","en":"Question"},"type":"radio","options":{"lv":["Opcija 1","Opcija 2"],"en":["Option 1","Option 2"]}},{"id":"131bf06c-3e48-40c4-87f7-5d1d46a7bdb1","label":{"lv":"Jaut\u0101jums 2","en":"Question 2"},"type":"radio","options":{"lv":["Opcija 1","Opcija 2"],"en":["Option 1","Option 2"]}}]}',
        ]);
    }
}
