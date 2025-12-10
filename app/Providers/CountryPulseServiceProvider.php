<?php

// app/Providers/CountryPulseServiceProvider.php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Cache\Events\CacheHit;
use Illuminate\Cache\Events\CacheMissed;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Database\Events\QueryExecuted;
use Throwable;

use App\Support\CountryPulse;
use App\Support\CountryContext;

class CountryPulseServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Cache
        Event::listen(CacheHit::class, function () {
            CountryPulse::record('cache_hit', CountryContext::code());
        });

        Event::listen(CacheMissed::class, function () {
            CountryPulse::record('cache_miss', CountryContext::code());
        });

        // Queue
        Event::listen(JobProcessed::class, function () {
            CountryPulse::record('job_processed', CountryContext::code());
        });

        Event::listen(JobFailed::class, function () {
            CountryPulse::record('job_failed', CountryContext::code());
        });

        // Slow queries (threshold example: 200ms)
        Event::listen(QueryExecuted::class, function (QueryExecuted $event) {
            if ($event->time >= 200) {
                CountryPulse::record('slow_query', CountryContext::code());
            }
        });

        // You can add more domains similarly:
        // slow_request, exception, outgoing_request, etc.
    }
}

