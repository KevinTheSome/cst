<?php

namespace App\Http\Controllers;
use App\Models\Admin;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


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
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $admin = Admin::where('email', $request->email)->first();

    if ($admin && Hash::check($request->password, $admin->password)) {
        $request->session()->put('is_admin', true);
        $request->session()->put('admin_id', $admin->id); 

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
