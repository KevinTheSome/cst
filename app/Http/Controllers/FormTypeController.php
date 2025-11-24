<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormType;
use App\Models\Form;
use Inertia\Inertia;

class FormTypeController extends Controller
{
    public function index(){
        $anketas = Form::all();
        return Inertia::render('Admin/Anketa/selectorAnketa', ['anketas' => $anketas]);
    }
}
