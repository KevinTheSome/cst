<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        RateLimiter::for('contact', function (Request $request) {
            $email = strtolower((string) $request->input('email'));
            $key = $email !== '' ? "contact:{$email}" : 'contact:'.$request->ip();

            return Limit::perMinutes(5, 1)->by($key)->response(function () {
                return back()
                    ->withErrors([
                        'email' => 'Jūs nesen jau sūtījāt ziņu. Lūdzu, mēģiniet vēlreiz pēc 5 minūtēm.',
                    ])
                    ->withInput();
            });
        });
    }
}
