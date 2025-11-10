<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DetectCountry
{
    public function handle(Request $request, Closure $next)
    {
        $testIp = $request->query('test_ip');
        $testCountry = $request->query('test_country');
        $ip = $testIp ?: $request->ip();

       
        if (in_array($ip, ['127.0.0.1', '::1'])) {
           
            $host = $request->getHost();
            $map = [
                'lab-lv.local' => 'LV',
                'lab-ee.local' => 'EE',
                'lab-us.local' => 'US',
            ];

            if (isset($map[$host])) {
                $countryCode = $map[$host];
                Log::info("Localhost host '{$host}' mapped to country {$countryCode}");
            } elseif ($testCountry) {
                $countryCode = strtoupper($testCountry);
                Log::info("Using ?test_country={$countryCode} for local request");
            } else {
                $countryCode = env('DEV_GEO', 'US');
                Log::info("Using DEV_GEO fallback={$countryCode} for local request");
            }

            $request->attributes->set('geo_country', $countryCode);
            Inertia::share('geoCountry', $countryCode);
            return $next($request);
        }

        $cacheKey = "geo_country_{$ip}";
        $countryCode = Cache::remember($cacheKey, now()->addHours(12), function () use ($ip) {
            try {
                $position = Location::get($ip);
                return $position?->countryCode ? strtoupper($position->countryCode) : null;
            } catch (\Throwable $e) {
                Log::warning("Location lookup failed for {$ip}: " . $e->getMessage());
                return null;
            }
        });

        if (empty($countryCode)) {
            $countryCode = config('geo.default_country', 'US');
            Log::debug("Falling back to default geo country: {$countryCode} for IP: {$ip}");
        }

        $request->attributes->set('geo_country', $countryCode);
        Inertia::share('geoCountry', $countryCode);

        Log::info("Detected country {$countryCode} for IP: {$ip}");

        return $next($request);
    }
}
