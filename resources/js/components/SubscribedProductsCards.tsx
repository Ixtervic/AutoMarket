import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React from 'react';

interface Product {
    id: number;
    image: string;
    title: string;
    description: string;
    brand_id: string;
    model: string;
    year: number;
    mileage: string;
    fuel_type: string;
    transmission: string;
    price: number;
    category_id: string;
    location_id: string;
    created_at: string;
}

interface SubscribedProductsProps {
    products: Product[];
}

const SubscribedProductsCards: React.FC<SubscribedProductsProps> = ({ products }) => {
    return (
        <Card className="mt-4 w-full border-none shadow-none">
            <CardContent className="p-4">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <div className="text-gray-600">Patrocinado</div>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col justify-between rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg"
                            >
                                <img
                                    src={product.image || '/imgs/ejemplo.jpg'}
                                    alt={product.title}
                                    className="mb-3 h-40 w-full rounded-md object-cover"
                                />
                                <div className="mb-2 space-y-1 text-sm">
                                    <div className="font-semibold text-gray-800">{product.title}</div>
                                    <div className="text-gray-600">Modelo: {product.model}</div>
                                    <div className="text-gray-600">Marca: {product.brand_id}</div>
                                    <div className="text-gray-600">Año: {product.year}</div>
                                    <div className="mt-2 text-base font-bold text-green-600">${product.price}</div>
                                </div>

                                <div className="mt-auto flex justify-between">
                                    <Link href={route('products.show', product.id)} className="text-sm text-blue-600 hover:underline">
                                        Ver más
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 p-4 text-center text-red-600">
                        <CircleAlert /> ¡No hay productos disponibles de usuarios suscritos!
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SubscribedProductsCards;
