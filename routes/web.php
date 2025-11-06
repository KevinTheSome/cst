<?php
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    App::setLocale('lv');
    syncLangFiles('head');

    return Inertia::render('welcome');
})->name('home');

Route::get('/test', [\App\Http\Controllers\TestController::class, 'test'])->name('test');


Route::get('/contacts', function () {
    return Inertia::render('contacts');
})->name('contacts');
