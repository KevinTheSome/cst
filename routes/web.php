<?php
use App\Http\Controllers\TestController;
use App\Http\Controllers\ContactsController;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    App::setLocale('lv');
    syncLangFiles('head');
    return Inertia::render('welcome');
});
Route::get('/test', [TestController::class, 'test'])->name('test');

Route::get('/contacts', function () {
    return Inertia::render('contacts');
})->name('contacts');

Route::get('/pievienojies-mums', function () {
    return Inertia::render('pievienojies-mums');
})->name('pievienojies-mums');

Route::get('/biocipu-zinatniska-laboratorija', function () {
    return Inertia::render('biocipu-zinatniska-laboratorija');
})->name('biocipu-zinatniska-laboratorija');

Route::get('/musu-grupa', function () {
    return Inertia::render('MusuGrupa');
})->name('musu-grupa');
