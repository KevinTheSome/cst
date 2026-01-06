<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ClinicalTrialsController extends Controller
{
    public function index()
    {
        // Make the language available for Inertia
        syncLangFiles('clinicalTrials');

        return Inertia::render('clinicalTrials');
    }
}
