<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TestBlockCountries
{
    public function handle(Request $request, Closure $next): Response
    {

        if ($request->has('debug_country')) {
            $country = strtoupper($request->query('debug_country'));
            $ip = $request->query('debug_ip', '127.0.0.1'); // optional IP param
                    
            $request->merge(['country' => $country]);
            return $next($request);
        }

        $ip = $this->resolveClientIp($request);
        if (
            (in_array($ip, ['127.0.0.1', '::1']) || app()->environment('local')) &&
            !config('geo.force_block_local', false)
        ) 
        $country = $this->lookupCountry($ip);

        $blocked = config('geo.blocked_countries', ['RU', 'CN', 'US']);
        $blockOnNull = config('geo.block_on_null', false);

        if (($country === null && $blockOnNull) || ($country && in_array($country, $blocked))) {
            return $this->blockedResponse($ip, $country);
        }

        $request->merge(['country' => $country]);
        return $next($request);
    }

    private function lookupCountry(string $ip): ?string
    {
        $cacheKey = "country_{$ip}";
        if ($cached = Cache::get($cacheKey)) {
            return $cached;
        }

        try {
            $resp = Http::timeout(3)
                ->acceptJson()
                //this needs to be fixed, later
                ->get("https://freeipapi.com/api/json/{$ip}?fields=countryCode");
                
            $code = $resp->json('country_code');
            $code = $code ? strtoupper($code) : null;

            if ($code) {
                Cache::put($cacheKey, $code, now()->addHours(24));
                return $code;
            }

            Log::warning("[GeoBlock] Lookup returned no country_code for IP={$ip}");
        } catch (\Throwable $e) {
            Log::error("[GeoBlock] Lookup error for IP={$ip}: {$e->getMessage()}");
        }

        return null;
    }

    private function blockedResponse(string $ip, ?string $country): Response
    {
        $country = $country ?? 'Unknown';

        $html = <<<HTML
        <!doctype html>
        <html lang="en"><head><meta charset="utf-8">
        <title>Access Blocked</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>
            body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif; margin: 2rem; color:#222; }
            .card { max-width: 720px; margin: auto; padding: 1.5rem; border: 1px solid #eee; border-radius: 10px; }
            h1 { margin: 0 0 .5rem }
            .muted { color:#666 }
            code { background:#f6f8fa; padding:.2rem .4rem; border-radius:6px; }
        </style>
        </head><body>
        <div class="card">
            <h1>Access Blocked</h1>
            <p>Country <strong>{$country}</strong> is not allowed.</p>
            <p class="muted">IP: <code>{$ip}</code></p>
        </div>
        </body></html>
        HTML;

        return response($html, 403)->header('Content-Type', 'text/html; charset=utf-8');
    }

    private function resolveClientIp(Request $request): string
    {
        if ($cf = $request->header('CF-Connecting-IP')) {
            return trim($cf);
        }
        if ($xff = $request->header('X-Forwarded-For')) {
            $first = trim(explode(',', $xff)[0]);
            if ($first !== '') {
                return $first;
            }
        }
        return $request->ip();
    }
}