<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class TestController extends Controller
{
    public function test()
    {
        // Set the locale (e.g., 'lv' or 'en')
        App::setLocale('en'); // change to 'en' if needed
        syncLangFiles('test');
        syncLangFiles('contect');
        // Do NOT call syncLangFiles() — it's not a real function

        // Render your Inertia page
        return Inertia::render('testpage');
    }
}
