<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:100'],
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'subject' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
            'website' => ['nullable', 'string', 'max:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.max' => 'Vārds un uzvārds ir pārāk garš.',
            'email.required' => 'E-pasta lauks ir obligāts.',
            'email.email' => 'Lūdzu, ievadiet derīgu e-pasta adresi.',
            'email.max' => 'E-pasta adrese ir pārāk gara.',
            'subject.max' => 'Temats ir pārāk garš.',
            'message.required' => 'Ziņas lauks ir obligāts.',
            'message.min' => 'Ziņai jābūt vismaz 10 rakstzīmes garai.',
            'message.max' => 'Ziņa ir pārāk gara.',
            'website.max' => 'Pretspama pārbaude neizdevās.',
        ];
    }
}
