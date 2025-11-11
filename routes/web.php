<?php

use App\Http\Controllers\TestController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\ContactController;
use App\Http\Middleware\CountryBlocker;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\TestBlockCountries;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


if (!function_exists('findPageComponent')) {
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

Route::middleware(TestBlockCountries::class)->group(function () {

    Route::get('/test', [TestController::class, 'test'])->name('test');


});

// Route::get('/test', [TestController::class, 'test'])
//     ->middleware(TestBlockCountries::class)
//     ->name('test');






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

Route::get('/', function () {
    App::setLocale('lv');
    syncLangFiles('head');
    return Inertia::render('welcome');
});

Route::post('/locale', function (Request $request) {
    $request->validate([
        'locale' => 'required|in:en,lv', // Validate supported locales
    ]);

    $locale = $request->input('locale');
    session(['locale' => $locale]);
    App::setLocale($locale);

    return response()->json(['success' => true]); // JSON for Inertia SPA handling
})->name('locale.switch');


Route::get('/contacts', fn() => Inertia::render('contacts'))->name('contacts');

Route::get('/pievienojies-mums', fn() => Inertia::render('pievienojies-mums'))->name('pievienojies-mums');

Route::get('/anketa', function () {
    return Inertia::render('anketa');
})->name('anketa');

Route::post('/contact', [ContactController::class, 'store'])
    ->name('contact.store')
    ->middleware('throttle:contact');

Route::get('/biocipu-zinatniska-laboratorija', function () {
    return Inertia::render('biocipu-zinatniska-laboratorija');
})->name('biocipu-zinatniska-laboratorija');

Route::get('/musu-grupa', fn() => Inertia::render('MusuGrupa'))->name('musu-grupa');

Route::get('/publikacijas', fn() => Inertia::render('publikacijas'))->name('publikacijas');

Route::get('/projects', fn() => Inertia::render('Projects'))->name('projects');

Route::get('/lablife', function () {
    return Inertia::render('lablife');
})->name('lablife');

Route::get('/admin', [AdminController::class, 'index']);
