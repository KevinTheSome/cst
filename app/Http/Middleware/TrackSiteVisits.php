<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Pulse\Facades\Pulse;

class TrackSiteVisits
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Only count once per session (1 "person" per browser session)
        if (!$request->session()->has('site_visit_recorded')) {

            Pulse::record(
                type: 'site_visit',  // custom type name
                key: 'global',       // all visitors grouped together
                value: 1
            )->count();             // increment counter

            $request->session()->put('site_visit_recorded', true);
        }

        return $response;
    }
}
