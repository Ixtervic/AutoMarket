<?php
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Ruta para acceder al formulario de producto
Route::get('product-form', function () {
    return Inertia::render('ProductForm'); // Se renderiza el archivo 'ProductForm.tsx'
})->name('product-form');

Route::post('/products', [ProductController::class, 'store'])->middleware('auth');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

