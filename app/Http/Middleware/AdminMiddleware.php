<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $isAdmin = $request->session()->get('is_admin', false);

        // If user is admin, continue.
        if ($isAdmin) {
            return $next($request);
        }

        // Allow public access to the admin login page itself to avoid redirect loops.
        if ($request->routeIs('admin.login') || $request->is('admin/login')) {
            return $next($request);
        }

        // If request is AJAX / API, return 403 JSON.
        if ($request->expectsJson() || $request->isXmlHttpRequest()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // ✅ Store intended URL so after login we can return here (e.g. /pulse)
        $request->session()->put('admin_intended', $request->fullUrl());

        // Otherwise redirect to the admin login page.
        return redirect()->route('admin.login');
    }
}
