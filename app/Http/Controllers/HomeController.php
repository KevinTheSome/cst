<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        App::setLocale('lv'); //change language file
        syncLangFiles('head'); // Load the auth.php language file
        return Inertia::render('welcome');
    }
}
