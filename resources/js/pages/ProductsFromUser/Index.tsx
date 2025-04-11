import ShowProducts from '@/components/my-show-products';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

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
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Productos',
        href: '/myproducts',
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
                <div className="ml-auto">
                    <Link
                        as="button"
                        href={route('product.create')}
                        className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                    >
                        <span className="flex items-center gap-2">
                            <CirclePlus size={20} /> Add Product
                        </span>
                    </Link>
                </div>

                <ShowProducts products={products} />
            </div>
        </AppLayout>
    );
}
