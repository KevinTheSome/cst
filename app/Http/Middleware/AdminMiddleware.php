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
        // This checks the named route (admin.login) and also the path /admin/login as a fallback.
        if ($request->routeIs('admin.login') || $request->is('admin/login')) {
            return $next($request);
        }

        // If request is AJAX / API, you may want to return 403 JSON instead of redirecting.
        if ($request->expectsJson() || $request->isXmlHttpRequest()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // Otherwise redirect to the admin login page.
        return redirect()->route('admin.login');
    }
}
