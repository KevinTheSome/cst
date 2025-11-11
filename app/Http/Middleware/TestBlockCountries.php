<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class TestBlockCountries
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {


        //http://localhost:8000Allowed (no debug)
        //http://localhost:8000?debug_ip=8.8.8.8&debug_country=US BLOCKED (if US blocked)
        // http://localhost:8000?debug_ip=1.2.3.4&debug_country=CN BLOCKED
        // http://localhost:8000?debug_ip=5.6.7.8&debug_country=LV Allowed (Latvia)



        // === DEBUG MODE: Simulate IP & Country via URL ===
        if ($request->has('debug_ip')) {
            $ip = $request->get('debug_ip');
            $country = $request->get('debug_country', 'XX'); // default unknown
        } else {
            // Normal flow
            $ip = $request->header('CF-Connecting-IP')
                ?? $request->header('X-Forwarded-For')
                ?? $request->ip();

            if (app()->environment('local') || in_array($ip, ['127.0.0.1', '::1'])) {
                return $next($request); // skip on real localhost
            }

            $country = Cache::remember("country_{$ip}", 24 * 60 * 60, function () use ($ip) {
                try {
                    $response = Http::get("http://ip-api.com/json/{$ip}?fields=countryCode");
                    return $response->json('countryCode') ?? null;
                } catch (\Exception $e) {
                    return null;
                }
            });
        }

        // === BLOCK LOGIC ===
        $blockedCountries = config('geo.blocked_countries', ['RU', 'CN']);

        if (in_array($country, $blockedCountries)) {
            return response('
            <h1>Access Blocked</h1>
            <p>Country <strong>' . $country . '</strong> is not allowed.</p>
            <p>IP: ' . $ip . '</p>
            <small>Remove ?debug_ip=... from URL to disable simulation.</small>
        ', 403);
        }

        return $next($request);
    }
}
