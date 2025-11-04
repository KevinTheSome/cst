<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactsController extends Controller
{
    public function contacts(){
        return Inertia::render('Contacts');
    }
}
