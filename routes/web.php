<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/test', [\App\Http\Controllers\TestController::class, 'test'])->name('test');


Route::get('/contacts', function () {
    return Inertia::render('contacts');
})->name('contacts');

