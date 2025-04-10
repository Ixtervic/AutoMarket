<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(): Response
    {
        return Inertia::render('Products/index', [
            'products' => Product::latest()->get(),
            'productsPremiun' => Product::whereHas('user.suscription')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create(): Response
    {
        return Inertia::render('ProductForm/Create');
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

        return redirect()->route('dashboard')->with('success', 'Vehículo publicado exitosamente.');
    }


    /**
     * Display the specified product.
     */
    public function show(Product $product): Response
    {
        $product->load(['user', 'image']); // Carga la relación del usuario y la imagen si la usas

        return Inertia::render('Products/Show', [
            'product' => [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                'brand_id' => $product->brand_id,
                'model' => $product->model,
                'year' => $product->year,
                'mileage' => $product->mileage,
                'fuel_type' => $product->fuel_type,
                'transmission' => $product->transmission,
                'price' => $product->price,
                'category_id' => $product->category_id,
                'location_id' => $product->location_id,
                'image' => $product->image ? asset('storage/' . $product->image->url) : null, // si tienes imagen
            ],
            'user' => [
                'name' => $product->user->name,
                'email' => $product->user->email,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product): Response
    {
        return Inertia::render('ProductForm/Edit', [
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
