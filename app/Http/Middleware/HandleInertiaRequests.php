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
        // Determine locale from session, or use default
        $locale = $request->session()->get('locale', config('app.locale'));

        // Set Laravel locale **before any translations**
        App::setLocale($locale);

        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),

            // current locale for frontend
            'locale' => $locale,

            // All translation bundles you want in JS
            'lang' => [
                'test'      => Lang::get('test'),
                'head'      => Lang::get('head'),
                'anketa'    => Lang::get('anketa'),
                'formcodes' => Lang::get('formcodes'),
                'clinical_trials' => Lang::get('clinical_trials'),
                'database' => Lang::get('database'),
                'post_dockanketa' => Lang::get('post_dockanketa'),
                'questions' => Lang::get('questions'),
                'admin'     => Lang::get('admin'),
                'admin_dashboard'     => Lang::get('admin_dashboard'),
                'specialistiem' => Lang::get('specialistiem'),
                'lecture_codes' => Lang::get('lecture_codes'),  
                'parmums' => Lang::get('parMums'),
                'files' => Lang::get('files'),
                'training' => Lang::get('training'),
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
