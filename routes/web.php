<?php
use App\Http\Controllers\TestController;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\ContactController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/test', [TestController::class, 'test'])->name('test');

Route::get('/contacts', function () {
    return Inertia::render('contacts');
})->name('contacts');

Route::get('/pievienojies-mums', function () {
    return Inertia::render('pievienojies-mums');
})->name('pievienojies-mums');

Route::get('/anketa', function () {
    return Inertia::render('anketa');
})->name('anketa');

Route::post('/contact', [ContactController::class, 'store'])
    ->name('contact.store')
    ->middleware('throttle:contact');

Route::get('/biocipu-zinatniska-laboratorija', function () {
    return Inertia::render('biocipu-zinatniska-laboratorija');
})->name('biocipu-zinatniska-laboratorija');

Route::get('/musu-grupa', function () {
    return Inertia::render('MusuGrupa');
})->name('musu-grupa');

Route::get('/publikacijas', function () {
    return Inertia::render('publikacijas');
})->name('publikacijas');

Route::get('/Projects', function () {
    return Inertia::render('Projects');
})->name('Projects');

Route::get('/lablife', function () {
    return Inertia::render('lablife');
})->name('lablife');
