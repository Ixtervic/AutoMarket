<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
         // Validación de los datos recibidos del formulario
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'year' => 'required|integer',
            'mileage' => 'required|string',
            'fuel_type' => 'required|string',
            'transmission' => 'required|string',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'required|exists:locations,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Crear el nuevo producto (vehículo)
        $product = Product::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'year' => $validated['year'],
            'mileage' => $validated['mileage'],
            'fuel_type' => $validated['fuel_type'],
            'transmission' => $validated['transmission'],
            'brand_id' => $validated['brand_id'],
            'category_id' => $validated['category_id'],
            'location_id' => $validated['location_id'],
        ]);

        // Guardar la imagen si se ha enviado
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
            $product->image_path = $imagePath;
            $product->save();
        }

        return response()->json(['message' => 'Vehículo publicado exitosamente', 'product' => $product], 201);
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
