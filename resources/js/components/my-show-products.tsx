import { Card, CardContent } from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import { CircleAlert, Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
    created_at: string;
}

interface ProductsCardsProps {
    products: Product[];
}

const MyProductsCards: React.FC<ProductsCardsProps> = ({ products }) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [sortOption, setSortOption] = useState<string>('newest');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [filterYear, setFilterYear] = useState<number | ''>('');
    const [filterModel, setFilterModel] = useState<string>('');

    useEffect(() => {
        let result = [...products];

        // Filtrado por precio
        result = result.filter((p) => {
            const meetsMin = p.price >= minPrice;
            const meetsMax = maxPrice !== '' ? p.price <= maxPrice : true;
            return meetsMin && meetsMax;
        });

        // Filtrado por año
        if (filterYear !== '') {
            result = result.filter((p) => p.year === Number(filterYear));
        }

        // Filtrado por modelo
        if (filterModel.trim() !== '') {
            const search = filterModel.toLowerCase();
            result = result.filter((p) => p.model.toLowerCase().includes(search));
        }

        // Ordenamiento
        switch (sortOption) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                break;
            case 'newest':
            default:
                result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
        }

        setFilteredProducts(result);
    }, [products, sortOption, minPrice, maxPrice, filterYear, filterModel]);

    return (
        <Card className="mt-4 w-full border-none shadow-none">
            <CardContent className="space-y-4 p-4">
                {/* Controles de filtros */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-300">Ordenar por:</label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                        >
                            <option value="newest">Más recientes</option>
                            <option value="oldest">Más antiguos</option>
                            <option value="price-asc">Precio: menor a mayor</option>
                            <option value="price-desc">Precio: mayor a menor</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-300">Precio mínimo:</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            className="w-24 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            min={0}
                        />
                        <label className="text-sm text-gray-300">máximo:</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-24 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            min={0}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-300">Año:</label>
                        <input
                            type="number"
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-24 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            placeholder="Ej: 2022"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-300">Modelo:</label>
                        <input
                            type="text"
                            value={filterModel}
                            onChange={(e) => setFilterModel(e.target.value)}
                            className="w-32 rounded-md border border-gray-700 bg-white p-2 text-sm text-gray-700"
                            placeholder="Ej: Civic"
                        />
                    </div>
                </div>

                {/* Productos */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {filteredProducts.map((product) => (
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
                                    <div className="font-semibold text-gray-800">Modelo: {product.model}</div>
                                    <div className="text-gray-600">Marca: {product.brand_id}</div>
                                    <div className="text-gray-600">Año: {product.year}</div>
                                    <div className="mt-2 text-base font-bold text-green-600">${product.price}</div>
                                </div>

                                <div className="mt-auto flex flex-wrap gap-2">
                                    <Link href={route('products.show', product.id)} className="text-sm text-blue-600 hover:underline">
                                        Ver más
                                    </Link>

                                    <Link
                                        href={route('product.edit', product.id)}
                                        className="flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-white hover:opacity-80"
                                    >
                                        <Pencil size={16} /> Editar
                                    </Link>

                                    <button
                                        onClick={() => {
                                            if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                                                router.delete(route('product.destroy', product.id), {
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                        className="flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-white hover:opacity-80"
                                    >
                                        <Trash2 size={16} /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 p-4 text-center text-red-600">
                        <CircleAlert /> ¡No tienes productos que coincidan con los filtros!
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MyProductsCards;
