<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\Log;
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
        try {
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
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images/products', 'public');
            }

            $product = Product::create([
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'brand_id' => $validated['brand_id'],
                'model' => $validated['model'],
                'year' => $validated['year'],
                'mileage' => $validated['mileage'],
                'fuel_type' => $validated['fuel_type'],
                'transmission' => $validated['transmission'],
                'price' => $validated['price'],
                'category_id' => $validated['category_id'],
                'location_id' => $validated['location_id'],
                'image_path' => $imagePath,
            ]);

            return redirect()->route('myproducts.index')->with('success', 'Vehículo publicado exitosamente.');
        } catch (Exception $e) {
            Log::error('Error al crear producto: ' . $e->getMessage());
            return redirect()->back()->with('error', 'No se pudo crear el producto. Inténtalo de nuevo.');
        }
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
        return Inertia::render('ProductsFromUser/Create', ['product' => $product, 'isEdit' => true]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        try {
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
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Actualización de campos
            $product->update([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'brand_id' => $validated['brand_id'],
                'model' => $validated['model'],
                'year' => $validated['year'],
                'mileage' => $validated['mileage'],
                'fuel_type' => $validated['fuel_type'],
                'transmission' => $validated['transmission'],
                'price' => $validated['price'],
                'category_id' => $validated['category_id'],
                'location_id' => $validated['location_id'],
            ]);

            // Manejo de imagen si se sube una nueva
            if ($request->hasFile('image')) {
                if ($product->image_path) {
                    Storage::disk('public')->delete($product->image_path);
                }
                $imagePath = $request->file('image')->store('images/products', 'public');
                $product->update(['image_path' => $imagePath]);
            }

            return redirect()->route('myproducts.index')->with('success', 'Vehículo actualizado exitosamente.');
        } catch (Exception $e) {
            Log::error('Error al actualizar producto: ' . $e->getMessage());
            return redirect()->back()->with('error', 'No se pudo actualizar el producto. Inténtalo de nuevo.');
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        try {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }

            $product->delete();

            return redirect()->back()->with('success', 'Producto eliminado exitosamente.');
        } catch (Exception $e) {
            Log::error('Error al eliminar producto: ' . $e->getMessage());
            return redirect()->back()->with('error', 'No se pudo eliminar el producto. Inténtalo de nuevo.');
        }
    }

}
