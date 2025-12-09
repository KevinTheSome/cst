<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use App\Models\Visit;
use Laravel\Pulse\Facades\Pulse;

class DetectCountry
{
    public function handle(Request $request, Closure $next)
    {
        $testIp = $request->query('test_ip');
        $testCountry = $request->query('test_country');
        $ip = $testIp ?: $request->ip();

        // Localhost handling
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

            // ✅ unified attribute
            $request->attributes->set('country_code', $countryCode);
            Inertia::share('geoCountry', $countryCode);

            $this->maybeRecordVisit($request, $ip, $countryCode);

            return $next($request);
        }

        // Remote IP handling with caching
        $cacheKey = "geo_country_{$ip}";
        $geo = Cache::remember($cacheKey, now()->addHours(12), function () use ($ip) {
            try {
                return Location::get($ip);
            } catch (\Throwable $e) {
                Log::warning("Location lookup failed for {$ip}: " . $e->getMessage());
                return null;
            }
        });

        $countryCode = $geo && $geo->countryCode
            ? strtoupper($geo->countryCode)
            : config('geo.default_country', 'US');

        // ✅ unified attribute (same key as localhost path)
        $request->attributes->set('country_code', $countryCode);
        Inertia::share('geoCountry', $countryCode);

        Log::info("Detected country {$countryCode} for IP: {$ip}");

        $this->maybeRecordVisit($request, $ip, $countryCode);

        return $next($request);
    }

    protected function maybeRecordVisit(Request $request, ?string $ip, ?string $countryCode): void
    {
        try {
            if (! $request->isMethod('GET')) {
                return;
            }

            $userAgent = $request->header('User-Agent') ?? '';
            $cookieName = 'visitor_hash';
            $visitorHash = $request->cookie($cookieName);

            if (empty($visitorHash)) {
                $visitorHash = hash('sha256', ($ip ?? '') . '|' . substr($userAgent, 0, 255));
                Cookie::queue($cookieName, $visitorHash, 1440);
            }

            $today = now()->toDateString();
            $lockKey = "visit_lock:{$visitorHash}:{$today}";
            $lock = Cache::lock($lockKey, 5);

            if (! $lock->get()) {
                return;
            }

            try {
                $alreadyVisited = Visit::query()
                    ->where('ip_hash', $visitorHash)
                    ->whereDate('created_at', $today)
                    ->exists();

                if ($alreadyVisited) {
                    return;
                }

                Visit::create([
                    'country_code' => $countryCode,
                    'country_name' => null,
                    'path' => $request->path(),
                    'ip_hash' => $visitorHash,
                    'user_agent' => substr($userAgent, 0, 255),
                ]);

                // Record a Pulse metric (optional)
                if (class_exists(Pulse::class)) {
                    Pulse::record('visits.by_country', $countryCode ?? 'unknown', 1)->sum();
                }
            } finally {
                $lock->release();
            }
        } catch (\Throwable $e) {
            Log::debug('Failed to record unique visit: ' . $e->getMessage());
        }
    }
}
