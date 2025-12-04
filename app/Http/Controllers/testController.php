<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    public function test(Request $request)
    {
        $country = $request->get('country');
        syncLangFiles('test');
        switch($country){
            case 'NL' :
                return Inertia::render('welcomeLt');
            default:
                return Inertia::render('testPage', [
                    'filename' => 'test.mp4',
                ]);
                break;
        }

    }
}
