<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/dashboard');
    }

    public function adminLogin()
    {
        return Inertia::render('Admin/login');
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
        return Inertia::render('Admin/missions');
    }

    public function insights()
    {
        return Inertia::render('Admin/insights');
    }

    public function contentStudio()
    {
        return Inertia::render('Admin/contentStudio');
    }

    public function requests()
    {
        return Inertia::render('Admin/requests');
    }

    public function teamHeatmap()
    {
        return Inertia::render('Admin/teamHeatmap');
    }

    public function integrations()
    {
        return Inertia::render('Admin/integrations');
    }

    public function security()
    {
        return Inertia::render('Admin/security');
    }

    public function workspace()
    {
        return Inertia::render('Admin/workspace');
    }
}
