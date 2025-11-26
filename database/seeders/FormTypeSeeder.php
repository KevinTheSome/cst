<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Form;
use App\Models\FormType;

class FormTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // atrodam abas formas
        $privateForm = Form::where('code', 'private')->first();
        $publicForm = Form::where('code', 'public')->first();

        // 1. CHRONIC form type -> private forma
        if ($privateForm) {
            FormType::firstOrCreate([
                'form_id' => $privateForm->id,
                'type' => 'chronic'
            ]);
        } else {
            $this->command->warn("Private form not found.");
        }

        // 2. SPECIALISTS form type -> public forma
        if ($publicForm) {
            FormType::firstOrCreate([
                'form_id' => $publicForm->id,
                'type' => 'psoriasis'
            ]);
        } else {
            $this->command->warn("Public form not found.");
        }
    }
}
