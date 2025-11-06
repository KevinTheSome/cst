<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ContactsController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/test', [TestController::class, 'test'])->name('test');

Route::get('/contacts', [ContactsController::class, 'contacts'])->name('contacts');