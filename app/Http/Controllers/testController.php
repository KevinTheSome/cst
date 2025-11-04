<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class TestController extends Controller
{
    public function test()
    {
        // Set the locale (e.g., 'lv' or 'en')
        App::setLocale('lv'); // change to 'en' if needed

        // Do NOT call syncLangFiles() — it's not a real function

        // Render your Inertia page
        return Inertia::render('testpage');
    }
}
