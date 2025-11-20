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
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Debug simulation via query string (works in prod too)
        if ($request->has('debug_ip')) {
            $ip = (string) $request->query('debug_ip');
            $country = (string) $request->query('debug_country', 'XX'); // default unknown
        } else {
            // Extract client IP safely
            $ip = $this->resolveClientIp($request);

            // Skip on true localhost/dev
            if (in_array($ip, ['127.0.0.1', '::1'], true) || app()->environment('local')) {
                return $next($request);
            }

            // Cache country per IP
            $cacheKey = "country_{$ip}";
            $ttlSeconds = 24 * 60 * 60; // 24h

            $country = Cache::remember($cacheKey, $ttlSeconds, function () use ($ip) {
                try {
                    // Use HTTPS, small timeout, and only needed field
                    $resp = Http::timeout(3)
                        ->acceptJson()
                        ->get("https://ip-api.com/json/{$ip}?fields=countryCode,status");

                    if (!$resp->ok()) {
                        return null;
                    }

                    if (($resp->json('status') ?? '') !== 'success') {
                        return null;
                    }

                    return $resp->json('countryCode') ?: null;
                } catch (\Throwable $e) {
                    // Network failure -> treat as unknown
                    return null;
                }
            });
        }

        // Config-driven block list
        $blockedCountries = (array) config('geo.blocked_countries', ['RU', 'CN']);

        if ($country !== null && in_array($country, $blockedCountries, true)) {
             return response('
                <h1>Access Blocked</h1>
                <p>Country <strong>' . $country . '</strong> is not allowed.</p>
                <p>IP: ' . $ip . '</p>
                <small>Remove ?debug_ip=... from URL to disable simulation.</small>
            ', 403);
        }

        // Optional: if country lookup failed (null), you can choose to block by default:
        // if ($country === null) { return response('Unable to determine country', 403); }

        return $next($request);
    }

    private function resolveClientIp(Request $request): string
    {
        // Prefer Cloudflare header
        $cfIp = $request->header('CF-Connecting-IP');
        if (is_string($cfIp) && $cfIp !== '') {
            return $cfIp;
        }

        // Parse X-Forwarded-For : first IP is the client
        $xff = $request->header('X-Forwarded-For');
        if (is_string($xff) && $xff !== '') {
            $first = trim(explode(',', $xff)[0]);
            if ($first !== '') {
                return $first;
            }
        }

        return $request->ip();
    }
}