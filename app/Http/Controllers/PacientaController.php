<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AdminController extends Controller
{
    public function atmp()
    {
        return Inertia::render('Pacientiem/atmp');
    }

    public function terapija()
    {
        return Inertia::render('Pacientiem/psoriaze-terapija');
    }

    public function terapija2()
    {
        return Inertia::render('Pacientiem/krona-terapija');
    }

    public function faq()
    {
        return Inertia::render('Pacientiem/faq');
    }
}
