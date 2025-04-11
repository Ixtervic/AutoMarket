<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\Response;

class SearchController extends Controller
{
    public function search(Request $request, $searched = null)
    {
        $searched = $searched ?? $request->input('searched');

        // Realizar la búsqueda parcial en el modelo Product
        $products = Product::where('title', 'like', '%' . $searched . '%')
                           ->orWhere('description', 'like', '%' . $searched . '%')
                           ->orWhere('model', 'like', '%' . $searched . '%')
                           ->orWhere('brand_id', 'like', '%' . $searched . '%')
                           ->latest()
                           ->get();

        return Inertia::render('Searches/Search', [
            'searched' => $searched,
            'products' => $products,
        ]);
    }
}
