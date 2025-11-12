<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function adminLogin()
    {
        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        // TEMP TEST ADMIN
        $testEmail = "admin@test.com";
        $testPassword = "secret123"; // plaintext for now

        if ($request->email === $testEmail && $request->password === $testPassword) {
            $request->session()->put('is_admin', true);

            return response()->json([
                'message' => 'Logged in!',
                'redirect' => route('admin.dashboard')
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials.'
        ], 401);
    }

    public function missions()
    {
        return Inertia::render('Admin/Missions');
    }

    public function insights()
    {
        return Inertia::render('Admin/Insights');
    }

    public function contentStudio()
    {
        return Inertia::render('Admin/ContentStudio');
    }

    public function requests()
    {
        return Inertia::render('Admin/Requests');
    }

    public function teamHeatmap()
    {
        return Inertia::render('Admin/TeamHeatmap');
    }

    public function integrations()
    {
        return Inertia::render('Admin/Integrations');
    }

    public function security()
    {
        return Inertia::render('Admin/Security');
    }

    public function workspace()
    {
        return Inertia::render('Admin/Workspace');
    }
}
