<?php

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\TestController;


if (! function_exists('findPageComponent')) {
    function findPageComponent(string $name): string
    {
        $base = resource_path('js/Pages') . DIRECTORY_SEPARATOR;
        $extensions = ['.tsx', '.jsx', '.vue', '.js'];

        foreach ($extensions as $ext) {
            if (file_exists($base . $name . $ext)) {
                return $name;
            }
        }

        return 'welcome';
    }
}


Route::get('/', function (Request $request) {
    // Country code provided by DetectCountry middleware
    $country = $request->attributes->get('geo_country', config('geo.default_country', 'US'));

    // Determine locale based on country map
    $locale = config('geo.map')[$country] ?? config('geo.default_locale', 'en');
    App::setLocale($locale);

    // Optional sync (keep if your app needs it)
    if (function_exists('syncLangFiles')) {
        syncLangFiles('head');
    }

    // Build page name (e.g., WelcomeEE, WelcomeNO)
    $pageName = "Welcome{$country}";
    $component = findPageComponent($pageName);

    // Render page and pass plain data
    return Inertia::render($component, [
        'detectedCountry' => $country,
        'locale' => $locale,
    ]);
})->name('home');

/*
|--------------------------------------------------------------------------
| Other static & controller routes
|--------------------------------------------------------------------------
| These render Inertia pages directly or use controllers.
*/
Route::get('/test', [TestController::class, 'test'])->name('test');

Route::get('/contacts', fn() => Inertia::render('contacts'))->name('contacts');

Route::get('/pievienojies-mums', fn() => Inertia::render('pievienojies-mums'))->name('pievienojies-mums');

Route::get('/biocipu-zinatniska-laboratorija', fn() => Inertia::render('biocipu-zinatniska-laboratorija'))->name('biocipu-zinatniska-laboratorija');

Route::get('/musu-grupa', fn() => Inertia::render('MusuGrupa'))->name('musu-grupa');

Route::get('/publikacijas', fn() => Inertia::render('publikacijas'))->name('publikacijas');

Route::get('/projects', fn() => Inertia::render('Projects'))->name('projects');

Route::get('/lablife', fn() => Inertia::render('lablife'))->name('lablife');
