import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    brand_id: string;
    model: string;
    year: number;
    mileage: number;
    fuel_type: string;
    transmission: string;
    price: number;
    category_id: string;
    location_id: string;
}

interface ProductsCardsProps {
    products: Product[];
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ products }) => {
    return (
        <Card className="mt-4 w-full border-none shadow-none">
            <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="rounded-xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                                <img
                                    src={product.image ? product.image : './imgs/ejemplo.jpg'}
                                    alt={`Producto ${product.id}`}
                                    className="mb-3 h-40 w-full rounded-md object-cover"
                                />
                                <div className="font-semibold text-gray-800">Modelo: {product.model}</div>
                                <div className="text-gray-600">Marca: {product.brand_id}</div>
                                <div className="mt-2 font-bold text-green-600">${product.price}</div>
                                <a href={route('products.show', product.id)} className="mt-2 inline-block text-blue-500 hover:underline">
                                    Ver más
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No se encontraron productos.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductsCards;
