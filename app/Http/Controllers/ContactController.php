<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Mail::to('adriansraitums95@gmail.com')->send(new ContactMessage($data));

        // Produkcijā ieteicams izmantot rindas apstrādi:
        // Mail::to('adriansraitums95@gmail.com')->queue(new ContactMessage($data));

        return back()->with('success', 'Paldies! Jūsu ziņa ir nosūtīta.');
    }
}
