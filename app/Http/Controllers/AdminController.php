<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\FormResult;

class AdminController extends Controller
{
    public function dashboard()
    {
        syncLangFiles('admin_dashboard');

        $completedCount = FormResult::whereNotNull('results->answers')
            ->whereJsonLength('results->answers', '>', 0)
            ->count();

        return Inertia::render('Admin/dashboard', [
            'formsCount' => FormResult::count(),
            'locale' => app()->getLocale(),
        ]);
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

            // ✅ Redirect back to intended page if set (e.g. /pulse)
            $intended = $request->session()->pull('admin_intended');
            $redirectTo = $intended ?: route('admin.dashboard');

            return response()->json([
                'message' => 'Logged in!',
                'redirect' => $redirectTo,
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials.'
        ], 401);
    }

    // ---------- CRUD for admin accounts ----------

    // List all admins (if you ever need a separate page)
    public function adminsIndex()
    {
        $admins = Admin::select('id', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/admins', [
            'admins' => $admins,
            'flash' => [
                'success' => session('success'),
            ],
        ]);
    }

    // Create new admin
    public function adminsStore(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|min:8|confirmed',
        ]);

        Admin::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()
            ->route('admin.security')
            ->with('success', 'Admin created.');
    }

    // Update existing admin
    public function adminsUpdate(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:admins,email,' . $admin->id,
            'password' => 'nullable|min:8|confirmed',
        ]);

        $data = [
            'email' => $validated['email'],
        ];

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $admin->update($data);

        return redirect()
            ->route('admin.security')
            ->with('success', 'Admin updated.');
    }

    // Delete admin
    public function adminsDestroy(Request $request, Admin $admin)
    {
        // Prevent deleting yourself
        if ($request->session()->get('admin_id') === $admin->id) {
            return redirect()
                ->route('admin.security')
                ->with('error', 'You cannot delete your own admin account while logged in.');
        }

        $admin->delete();

        return redirect()
            ->route('admin.security')
            ->with('success', 'Admin deleted.');
    }

    // ---------- existing other pages ----------

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
        $admins = Admin::select('id', 'email', 'created_at')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/security', [
            'admins' => $admins,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function workspace()
    {
        return Inertia::render('Admin/workspace');
    }
}
