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

Route::get('/contacts', [ContactsController::class, 'contacts'])->name('contacts');
