<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
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
