<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class TestController extends Controller
{
    public function test()
    {
        syncLangFiles('test');
        syncLangFiles('contect');
        return Inertia::render('testpage');
    }
}
