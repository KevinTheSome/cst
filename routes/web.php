<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/test', [\App\Http\Controllers\TestController::class, 'test'])->name('test');


Route::get('/contacts', function () {
    return Inertia::render('contacts');
})->name('contacts');

