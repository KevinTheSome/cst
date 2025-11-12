<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index()
    {
        return Inertia::render('questions');
    }
}
