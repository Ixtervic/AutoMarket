<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\MyProductsController;
use App\Http\Controllers\SearchController;

Route::get('/', function () {
    return Inertia::render('welcome');
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
Route::middleware(['auth'])->group(function () {
    Route::get('/myproducts/index', [MyProductsController::class, 'index'])->name('myproducts.index');
    Route::get('/products/create', [MyProductsController::class, 'create'])->name('product.create');
    Route::post('/products/create', [MyProductsController::class, 'store'])->name('product.store');
    
});

Route::get('/products/index', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::get('/searched', [SearchController::class, 'search'])->name('search');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
