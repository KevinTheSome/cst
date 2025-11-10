<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Stevebauman\Location\Facades\Location;

class CountryBlocker
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): \Symfony\Component\HttpFoundation\Response  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // use getClientIp() to be a bit more robust behind proxies
        $ip = $request->getClientIp();

        $position = Location::get($ip);

        // If we can't detect location — deny (or you could allow)
        if (! $position) {
            return response('Unable to detect your location.', 403);
        }

        // Blocked countries (ISO country codes)
        $blocked = ['RU', 'BY', 'CN'];

        if (in_array($position->countryCode, $blocked, true)) {
            return response('Access not allowed in your country.', 403);
        }

        return $next($request);
    }
}