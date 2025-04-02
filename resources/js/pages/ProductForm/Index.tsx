import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ProductFormData {
    title: string;
    description: string;
    brand_id: string;
    model: string;
    year: string;
    mileage: string;
    fuel_type: string;
    transmission: string;
    price: string;
    category_id: string;
    location_id: string;
}

export default function ProductForm() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ProductFormData>>({
        title: '',
        description: '',
        brand_id: '',
        model: '',
        year: '',
        mileage: '',
        fuel_type: '',
        transmission: '',
        price: '',
        category_id: '',
        location_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthLayout title="Add a new product" description="Enter product details below">
            <Head title="New Product" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={processing}
                            placeholder="Product title"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="brand_id">Brand</Label>
                        <Input
                            id="brand_id"
                            type="text"
                            required
                            value={data.brand_id}
                            onChange={(e) => setData('brand_id', e.target.value)}
                            disabled={processing}
                            placeholder="Brand ID"
                        />
                        <InputError message={errors.brand_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                            id="model"
                            type="text"
                            required
                            value={data.model}
                            onChange={(e) => setData('model', e.target.value)}
                            disabled={processing}
                            placeholder="Model"
                        />
                        <InputError message={errors.model} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="year">Year</Label>
                        <Input
                            id="year"
                            type="number"
                            required
                            value={data.year}
                            onChange={(e) => setData('year', e.target.value)}
                            disabled={processing}
                            placeholder="Year"
                        />
                        <InputError message={errors.year} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="mileage">Mileage</Label>
                        <Input
                            id="mileage"
                            type="text"
                            required
                            value={data.mileage}
                            onChange={(e) => setData('mileage', e.target.value)}
                            disabled={processing}
                            placeholder="Mileage"
                        />
                        <InputError message={errors.mileage} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fuel_type">Fuel Type</Label>
                        <Input
                            id="fuel_type"
                            type="text"
                            required
                            value={data.fuel_type}
                            onChange={(e) => setData('fuel_type', e.target.value)}
                            disabled={processing}
                            placeholder="Fuel Type"
                        />
                        <InputError message={errors.fuel_type} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="transmission">Transmission</Label>
                        <Input
                            id="transmission"
                            type="text"
                            required
                            value={data.transmission}
                            onChange={(e) => setData('transmission', e.target.value)}
                            disabled={processing}
                            placeholder="Transmission"
                        />
                        <InputError message={errors.transmission} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            required
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            disabled={processing}
                            placeholder="Price"
                        />
                        <InputError message={errors.price} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category_id">Category</Label>
                        <Input
                            id="category_id"
                            type="text"
                            required
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            disabled={processing}
                            placeholder="Category ID"
                        />
                        <InputError message={errors.category_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location_id">Location</Label>
                        <Input
                            id="location_id"
                            type="text"
                            required
                            value={data.location_id}
                            onChange={(e) => setData('location_id', e.target.value)}
                            disabled={processing}
                            placeholder="Location ID"
                        />
                        <InputError message={errors.location_id} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Add Product
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
