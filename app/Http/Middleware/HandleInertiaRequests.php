<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        // Set locale from session (with fallback) so all Lang::get() use the same locale
        $locale = $request->session()->get('locale', config('app.locale'));
        App::setLocale($locale);

        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),

            // current locale for frontend
            'locale' => $locale,

            // 🔹 All translation bundles you want in JS
            'lang' => [
                'test'   => Lang::get('test'),
                'head'   => Lang::get('head'),
                'anketa' => Lang::get('anketa'),
            ],

            'name'  => config('app.name'),
            'quote' => [
                'message' => trim($message),
                'author'  => trim($author),
            ],

            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
