<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Schema;

use Illuminate\Foundation\Http\Events\RequestHandled;
use Illuminate\Foundation\Exceptions\Events\ExceptionReported;

use Illuminate\Cache\Events\CacheHit;
use Illuminate\Cache\Events\CacheMissed;

use Illuminate\Queue\Events\JobQueued;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobFailed;

use Illuminate\Database\Events\QueryExecuted;

use Illuminate\Http\Client\Events\RequestSending;
use Illuminate\Http\Client\Events\ResponseReceived;
use Illuminate\Http\Client\Events\ConnectionFailed;

use App\Support\CountryPulse;
use App\Support\CountryContext;
use Illuminate\Queue\Events\JobProcessing;


class CountryPulseServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Avoid breaking migrations & CLI tasks
        if ($this->app->runningInConsole()) {
            return;
        }

        // Don't register listeners until table exists
        if (! Schema::hasTable('country_pulse_metrics')) {
            return;
        }

        /**
         * ----------------------------------------
         * REQUEST-BASED METRICS (country-aware)
         * - application usage (requests by user)
         * - top routes (route hits)
         * ----------------------------------------
         */
        Event::listen(RequestHandled::class, function (RequestHandled $event) {
            $request = $event->request;

            // usage + routes are most useful for GET
            if (! $request->isMethod('GET')) {
                return;
            }

            $country = CountryContext::code();

            // -------------------------
            // Application usage metric
            // -------------------------
            $user = $request->user();
            $userLabel = $user ? ('user:' . $user->id) : 'guest';

            CountryPulse::record('request', $country, 1, $userLabel);

            // -------------------------
            // Top routes metric
            // -------------------------
            $path = '/' . ltrim($request->path(), '/');

            // Skip noisy/internal routes
            if (
                str_starts_with($path, '/pulse') ||
                str_starts_with($path, '/livewire') ||
                str_starts_with($path, '/_ignition') ||
                str_starts_with($path, '/telescope')
            ) {
                return;
            }

            $route = $request->route();
            $routeName = $route?->getName();

            $routeLabel = $routeName
                ? ('route:' . $routeName)
                : ('path:' . $path);

            CountryPulse::record('route_hit', $country, 1, $routeLabel);
        });

        /**
         * ----------------------------------------
         * CACHE METRICS (country-aware)
         * ----------------------------------------
         */
        Event::listen(CacheHit::class, function (CacheHit $event) {
            $country = CountryContext::code();
            $store = $event->storeName ?? null;
            $label = $store ? ('store:' . $store) : null;

            CountryPulse::record('cache_hit', $country, 1, $label);
        });

        Event::listen(CacheMissed::class, function (CacheMissed $event) {
            $country = CountryContext::code();
            $store = $event->storeName ?? null;
            $label = $store ? ('store:' . $store) : null;

            CountryPulse::record('cache_miss', $country, 1, $label);
        });

        /**
         * ----------------------------------------
         * QUEUE METRICS (country-aware)
         * ----------------------------------------
         */
        Event::listen(JobQueued::class, function (JobQueued $event) {
            $country = CountryContext::code();
            $queue = $event->queue ?? 'default';

            CountryPulse::record('job_queued', $country, 1, 'queue:' . $queue);
        });

        Event::listen(JobProcessed::class, function (JobProcessed $event) {
            $country = CountryContext::code();

            $queue = method_exists($event->job, 'getQueue')
                ? ($event->job->getQueue() ?? 'default')
                : 'default';

            CountryPulse::record('job_processed', $country, 1, 'queue:' . $queue);
        });

        Event::listen(JobFailed::class, function (JobFailed $event) {
            $country = CountryContext::code();

            $queue = method_exists($event->job, 'getQueue')
                ? ($event->job->getQueue() ?? 'default')
                : 'default';

            CountryPulse::record('job_failed', $country, 1, 'queue:' . $queue);
        });

        /**
         * ----------------------------------------
         * EXCEPTIONS (country-aware)
         * ----------------------------------------
         */
        Event::listen(ExceptionReported::class, function (ExceptionReported $event) {
            $country = CountryContext::code();
            $label = class_basename($event->exception);

            CountryPulse::record('exception', $country, 1, $label);
        });

        /**
         * ----------------------------------------
         * SLOW QUERIES (country-aware)
         * ----------------------------------------
         */
        Event::listen(QueryExecuted::class, function (QueryExecuted $event) {
            if ($event->time < 200) {
                return;
            }

            $country = CountryContext::code();
            $label = 'conn:' . ($event->connectionName ?? 'default');

            CountryPulse::record('slow_query', $country, 1, $label);

            if ($event->time >= 1000) {
                CountryPulse::record('very_slow_query', $country, 1, $label);
            }
        });

        /**
         * ----------------------------------------
         * OUTGOING HTTP (country-aware)
         * ----------------------------------------
         */
        static $httpStarts = [];

        Event::listen(RequestSending::class, function (RequestSending $event) use (&$httpStarts) {
            $key = spl_object_id($event->request);
            $httpStarts[$key] = microtime(true);
        });

        Event::listen(ResponseReceived::class, function (ResponseReceived $event) use (&$httpStarts) {
            $key = spl_object_id($event->request);
            $start = $httpStarts[$key] ?? null;
            unset($httpStarts[$key]);

            if (! $start) {
                return;
            }

            $durationMs = (int) round((microtime(true) - $start) * 1000);

            if ($durationMs < 1000) {
                return;
            }

            $country = CountryContext::code();

            $url = (string) $event->request->url();
            $host = parse_url($url, PHP_URL_HOST) ?: 'unknown';
            $label = 'host:' . $host;

            CountryPulse::record('slow_outgoing', $country, 1, $label);
        });

        Event::listen(ConnectionFailed::class, function (ConnectionFailed $event) use (&$httpStarts) {
            $key = spl_object_id($event->request);
            unset($httpStarts[$key]);

            $country = CountryContext::code();

            $url = (string) $event->request->url();
            $host = parse_url($url, PHP_URL_HOST) ?: 'unknown';
            $label = 'host:' . $host;

            CountryPulse::record('outgoing_failed', $country, 1, $label);
        });
        /**
 * ----------------------------------------
 * SLOW JOBS (country-aware)
 * ----------------------------------------
 */
static $jobStarts = [];

Event::listen(JobProcessing::class, function (JobProcessing $event) use (&$jobStarts) {
    $key = method_exists($event->job, 'uuid')
        ? ($event->job->uuid() ?? spl_object_id($event->job))
        : spl_object_id($event->job);

    $jobStarts[$key] = microtime(true);
});

$recordSlowJob = function ($event) use (&$jobStarts) {
    $job = $event->job;

    $key = method_exists($job, 'uuid')
        ? ($job->uuid() ?? spl_object_id($job))
        : spl_object_id($job);

    $start = $jobStarts[$key] ?? null;
    unset($jobStarts[$key]);

    if (! $start) {
        return;
    }

    $durationMs = (int) round((microtime(true) - $start) * 1000);

    // Threshold for slow jobs
    if ($durationMs < 1000) {
        return;
    }

    $country = CountryContext::code();

    $queue = method_exists($job, 'getQueue')
        ? ($job->getQueue() ?? 'default')
        : 'default';

    // Try to get job class name safely
    $name = method_exists($job, 'resolveName')
        ? $job->resolveName()
        : class_basename($job);

    $label = 'queue:' . $queue . '|job:' . $name;

    CountryPulse::record('slow_job', $country, 1, $label);
};

// When successful
Event::listen(JobProcessed::class, $recordSlowJob);

// When failed
Event::listen(JobFailed::class, $recordSlowJob);

    }
}
