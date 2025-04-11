import ShowProducts from '@/components/show-products';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

interface PageProps {
    auth: {
        user: any;
    };
    products: Product[];
    searched: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Search',
        href: '/results',
    },
];

export default function Search({ searched, products }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Resultados de búsqueda: ${searched}`} />

            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="mt-4 text-xl font-semibold">Resultados para: {searched}</h2>
                </div>
                <ShowProducts products={products} />
            </div>
        </AppLayout>
    );
}
