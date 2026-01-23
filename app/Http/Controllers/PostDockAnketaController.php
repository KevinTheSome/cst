<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;

class PostDockAnketaController extends Controller
{
    public function index(Request $request)
    {
        syncLangFiles('post_dockanketa');

      
        $role = $request->query('role');

 
        if ($role) {
       
            $request->session()->put('postdock_anketa_role', $role);
        } else {
            
            $role = $request->session()->get('postdock_anketa_role');
        }

        return Inertia::render('PostDockanketa', [
            'locale' => App::getLocale(),
            'role' => $role,
        ]);
    }
}