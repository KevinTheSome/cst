<?php

namespace App\Http\Controllers\Ai;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class AiPageController extends Controller
{
    public function index()
    {
        return Inertia::render('AiAssistant');
    }
}
