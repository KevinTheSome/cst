<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test()
    {
        //App::setLocale('en');
        App::setLocale('lv'); //change language file
        syncLangFiles('test'); // Load the auth.php language file

        return Inertia::render('testpage');
    }
}

