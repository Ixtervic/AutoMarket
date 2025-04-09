<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class MyProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // $user = Auth::user();

        // if (!$user) {
        //     abort(403, 'No autenticado');
        // }

        // return Inertia::render('ProductsFromUser/Index', [
        //     'products' => $user()->products()->latest()->get(),
        // ]);
        return Inertia::render('ProductsFromUser/Index', [
            'products' => Product::where('user_id', Auth::id())
                ->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('ProductsFromUser/Create');
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        // Validar la solicitud
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'mileage' => 'required|string',
            'fuel_type' => 'required|string',
            'transmission' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
        ]);

        $product = new Product($validated);
        $product->user_id = Auth::id();

        $product->save();

        return redirect()->route('myproducts.index')->with('success', 'Vehículo publicado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        return Inertia::render('ProductsFromUser/Edit', [
            'product' => $product->load(['brand', 'category', 'location']),
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
//        $this->authorize('update', $product);

        // Validar los datos actualizados
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'mileage' => 'required|string',
            'fuel_type' => 'required|string',
            'transmission' => 'required|string',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Actualizar los datos del producto
        $product->update($validatedData);

        // Si se sube una nueva imagen, eliminar la anterior y guardar la nueva
        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $imagePath = $request->file('image')->store('images/products', 'public');
            $product->update(['image_path' => $imagePath]);
        }

        return redirect()->route('products.index')->with('success', 'Vehículo actualizado exitosamente.');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        //$this->authorize('delete', $product);

        // Eliminar la imagen asociada si existe
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Vehículo eliminado exitosamente.');
    }

}
