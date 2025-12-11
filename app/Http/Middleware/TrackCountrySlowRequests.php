<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;

use App\Support\CountryContext;
use App\Support\CountryPulse;

class TrackCountrySlowRequests
{
    private int $thresholdMs = 1000; // 1s

    public function handle(Request $request, Closure $next): Response
    {
        $start = microtime(true);

        /** @var Response $response */
        $response = $next($request);

        // Only track GETs
        if (! $request->isMethod('GET')) {
            return $response;
        }

        // Ensure table exists (safe during deploy/migrations)
        if (! Schema::hasTable('country_pulse_metrics')) {
            return $response;
        }

        $durationMs = (int) round((microtime(true) - $start) * 1000);

        if ($durationMs < $this->thresholdMs) {
            return $response;
        }

        $path = '/' . ltrim($request->path(), '/');

        // Skip internal/noisy routes
        if (
            str_starts_with($path, '/pulse') ||
            str_starts_with($path, '/livewire') ||
            str_starts_with($path, '/_ignition') ||
            str_starts_with($path, '/telescope')
        ) {
            return $response;
        }

        $route = $request->route();
        $routeName = $route?->getName();

        $label = $routeName
            ? ('route:' . $routeName)
            : ('path:' . $path);

        $country = CountryContext::code();

        CountryPulse::record('slow_request', $country, 1, $label);

        return $response;
    }
}
