<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
});

Route::get('dashboard', function () {
        return Inertia::render('dashboard');
})->name('dashboard');


/*
 //Admin routes
*/
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/admin/users', [AdminController::class, 'index'])->name('admin.users.index');
// });

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::resource('admin/users', AdminController::class)->only(['index', 'update', 'destroy']);
// });

// Route::resource('AdminUser',AdminController::class)
//     ->only(['index', 'store', 'update', 'destroy'])
//     ->middleware(['auth','verified']);

Route::resource('AdminUsers', AdminController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->parameters(['AdminUsers' => 'user']) // <-- aquí indicamos que el parámetro será 'user'
    ->middleware(['auth', 'verified']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
