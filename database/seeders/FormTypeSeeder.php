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
        // Assign form types based on database IDs
        // ID 1 -> psoriasis
        $form1 = Form::find(1);
        if ($form1) {
            FormType::firstOrCreate([
                'form_id' => $form1->id,
                'type' => 'psoriasis'
            ]);
        } else {
            $this->command->warn("Form with ID 1 not found.");
        }

        // ID 2 -> chronic
        $form2 = Form::find(2);
        if ($form2) {
            FormType::firstOrCreate([
                'form_id' => $form2->id,
                'type' => 'chronic'
            ]);
        } else {
            $this->command->warn("Form with ID 2 not found.");
        }

        // ID 3 -> specialists
        $form3 = Form::find(3);
        if ($form3) {
            FormType::firstOrCreate([
                'form_id' => $form3->id,
                'type' => 'specialists'
            ]);
        } else {
            $this->command->warn("Form with ID 3 not found.");
        }

    }
}
