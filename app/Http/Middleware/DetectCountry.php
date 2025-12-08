<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

// NEW imports
use App\Models\Visit;
use Laravel\Pulse\Facades\Pulse;

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

            // Persist a visit for local development as well (optional)
            $this->recordVisit($request, $ip, $countryCode);

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

        // RECORD the visit (DB + Pulse)
        $this->recordVisit($request, $ip, $countryCode);

        return $next($request);
    }

    /**
     * Record visit to DB and to Pulse (privacy: store hashed IP).
     */
    protected function recordVisit(Request $request, ?string $ip, ?string $countryCode): void
    {
        try {
            // Privacy: store hash of IP, not raw IP
            $ipHash = $ip ? hash('sha256', $ip) : null;

            Visit::create([
                'country_code' => $countryCode,
                'country_name' => null, // optional - Location package can provide name if you want $position->countryName
                'path' => $request->path(),
                'ip_hash' => $ipHash,
                'user_agent' => substr($request->header('User-Agent') ?? '', 0, 255),
            ]);
        } catch (\Throwable $e) {
            // Fail silent, but log in debug
            Log::debug('Failed to persist visit: '.$e->getMessage());
        }

        // Also record into Pulse for easy aggregation if Pulse is installed & configured
        try {
            // metric name 'visits.by_country', group by country code, increment by 1
            if (class_exists(Pulse::class)) {
                Pulse::record('visits.by_country', $countryCode ?? 'unknown', 1)->sum();
            }
        } catch (\Throwable $e) {
            Log::debug('Pulse record failed: '.$e->getMessage());
        }
    }
}
