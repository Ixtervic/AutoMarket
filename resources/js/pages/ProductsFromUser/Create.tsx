import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CustomTextArea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

export default function Create({ ...props }, Product = {}) {
    const { product, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isEdit ? 'Edit' : isView ? 'View' : 'Create'} Product`,
            href: isEdit ? route('product.update', product.id) : route('product.create'),
        },
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: product?.title || '',
        description: product?.description || '',
        brand_id: product?.brand_id || '',
        model: product?.model || '',
        year: product?.year || '',
        mileage: product?.mileage || '',
        fuel_type: product?.fuel_type || '',
        transmission: product?.transmission || '',
        price: product?.price || '',
        category_id: product?.category_id || '',
        location_id: product?.location_id || '',
        featured_image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value as any);
            }
        });

        const options = {
            onSuccess: () => reset(),
            forceFormData: true, // importante para Inertia
        };

        if (isEdit) {
            put(route('product.update', product.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('product.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    // Handle file input separately
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('featured_image', e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <div className="mb-4 ml-auto">
                <Link
                    as="button"
                    href={route('myproducts.index')}
                    className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                >
                    <span className="flex items-center gap-2">
                        <ArrowLeft size={20} />
                        Back
                    </span>
                </Link>
            </div>

            <Card className="shadow-xl">
                <CardContent>
                    <form className="flex flex-col gap-6" onSubmit={submit} autoComplete="off">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Product Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Product title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <CustomTextArea
                                    rows={3}
                                    id="description"
                                    tabIndex={2}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Description"
                                />
                                <InputError message={errors.description} />
                            </div>

                            {/* Brand_id */}
                            <div className="grid gap-2">
                                <Label htmlFor="brand_id">Brand_id</Label>
                                <Input
                                    id="brand_id"
                                    type="text"
                                    tabIndex={3}
                                    value={data.brand_id}
                                    onChange={(e) => setData('brand_id', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Brand_id"
                                />
                                <InputError message={errors.brand_id} />
                            </div>

                            {/* Model */}
                            <div className="grid gap-2">
                                <Label htmlFor="model">Model</Label>
                                <Input
                                    id="model"
                                    type="text"
                                    tabIndex={4}
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Model"
                                />
                                <InputError message={errors.model} />
                            </div>

                            {/* Year */}
                            <div className="grid gap-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    type="text"
                                    tabIndex={5}
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Year"
                                />
                                <InputError message={errors.year} />
                            </div>

                            {/* Mileage */}
                            <div className="grid gap-2">
                                <Label htmlFor="mileage">Mileage</Label>
                                <Input
                                    id="mileage"
                                    type="text"
                                    tabIndex={6}
                                    value={data.mileage}
                                    onChange={(e) => setData('mileage', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Mileage"
                                />
                                <InputError message={errors.mileage} />
                            </div>

                            {/* Fuel Type */}
                            <div className="grid gap-2">
                                <Label htmlFor="fuel_type">Fuel Type</Label>
                                <Input
                                    id="fuel_type"
                                    type="text"
                                    tabIndex={7}
                                    value={data.fuel_type}
                                    onChange={(e) => setData('fuel_type', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Fuel_type"
                                />
                                <InputError message={errors.fuel_type} />
                            </div>

                            {/* Transmission */}
                            <div className="grid gap-2">
                                <Label htmlFor="transmission">Transmission</Label>
                                <Input
                                    id="transmission"
                                    type="text"
                                    tabIndex={8}
                                    value={data.transmission}
                                    onChange={(e) => setData('transmission', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Transmission"
                                />
                                <InputError message={errors.transmission} />
                            </div>

                            {/* Price */}
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="text"
                                    tabIndex={9}
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Price"
                                />
                                <InputError message={errors.price} />
                            </div>

                            {/* Category_id */}
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">Category_id</Label>
                                <Input
                                    id="category_id"
                                    type="text"
                                    tabIndex={10}
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Category_id"
                                />
                                <InputError message={errors.category_id} />
                            </div>

                            {/* Location_id */}
                            <div className="grid gap-2">
                                <Label htmlFor="location_id">Location_id</Label>
                                <Input
                                    id="location_id"
                                    type="text"
                                    tabIndex={11}
                                    value={data.location_id}
                                    onChange={(e) => setData('location_id', e.target.value)}
                                    disabled={processing || isView}
                                    placeholder="Location_id"
                                />
                                <InputError message={errors.location_id} />
                            </div>

                            {/* Featured Image */}
                            {!isView && (
                                <div className="grid gap-2">
                                    <Label htmlFor="featured_image">Featured Image (optional)</Label>
                                    <Input id="featured_image" type="file" tabIndex={12} onChange={handleFileChange} disabled={processing} />
                                    <InputError message={errors.featured_image} />
                                </div>
                            )}

                            {/* Is Edit then show featured image */}
                            {(isEdit || isView) && (
                                <div className="grid gap-2">
                                    <Label htmlFor="featured_image">Current Featured Image</Label>
                                    <img src={`/${product.featured_image}`} alt="Featured" className="h-40 w-50 rounded-lg" />
                                </div>
                            )}

                            {!isView && (
                                <Button type="submit" className="text-md mt-2 w-fit cursor-pointer rounded-lg py-5 text-white" tabIndex={13}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {processing ? (isEdit ? 'Updating...' : 'Saving...') : isEdit ? 'Update' : 'Save'}
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
