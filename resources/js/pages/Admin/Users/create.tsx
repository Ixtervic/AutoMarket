import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create(props: { user?: any; isEdit?: boolean; isView?: boolean }) {
    const { user, isEdit, isView } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isEdit ? 'Edit' : isView ? 'View' : 'Create'} User`,
            href: route('AdminUsers.index'),
        },
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        is_admin: user?.is_admin || false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('AdminUsers.update', user.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('AdminUsers.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isEdit ? 'Edit' : isView ? 'View' : 'Create'} User`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="ml-auto">
                    <Link
                        as="button"
                        href={route('AdminUsers.index')}
                        className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft size={20} />
                            Back
                        </span>
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-2xl">
                    <Card className="shadow-xl">
                        <CardContent>
                            <form className="flex flex-col gap-6 py-6" onSubmit={submit} autoComplete="off">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">User Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing || isView}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing || isView}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password (solo en create o si se desea cambiar) */}
                                {!isView && (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">Password Confirmation</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                disabled={processing}
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                    </>
                                )}

                                {/* Is Admin */}
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="is_admin"
                                        checked={!!data.is_admin}
                                        onCheckedChange={(checked) => setData('is_admin', checked === true)}
                                        disabled={processing || isView}
                                    />
                                    <Label htmlFor="is_admin">Is Admin?</Label>
                                </div>

                                {/* Submit */}
                                {!isView && (
                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
