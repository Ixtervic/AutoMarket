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
}

interface PageProps {
    auth: {
        user: any;
    };
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/products/index',
    },
];

export default function Index({ products }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />

            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Productos</h1>
                </div>

                <ShowProducts products={products} />
            </div>
        </AppLayout>
    );
}
