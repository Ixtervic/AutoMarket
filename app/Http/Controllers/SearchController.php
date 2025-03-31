<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        $order = $request->input('order', 'asc'); // Por defecto ordena ascendente

        $products = Product::query()
            ->where('name', 'like', "%{$query}%")
            ->orWhere('id', 'like', "%{$query}%")
            ->orderBy('price', $order)
            ->get();

        return inertia('Searches/Search', [
            'products' => $products,
            'query' => $query,
            'order' => $order,
        ]);
    }
}
