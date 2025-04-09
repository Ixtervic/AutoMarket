import UsersTable from '@/components/admin/UsersTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    // Agrega aquí otros campos que necesites mostrar
}

interface PageProps {
    auth: {
        user: any;
    };
    users: User[];
}

const DEFAULT_USER: User = {
    id: 0,
    name: '',
    email: '',
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
    },
];

export default function Index({ auth, users }: PageProps) {
    const [userModel, setUserModel] = useState<User>({ ...DEFAULT_USER });
    const [showUserModal, setShowUserModal] = useState(false);

    const showAddNewModal = () => {
        setShowUserModal(true);
    };

    const onModalClose = () => {
        setUserModel({ ...DEFAULT_USER });
        setShowUserModal(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Usuarios</h1>
                    <div className="ml-auto">
                        <Link
                            as="button"
                            href={route('AdminUsers.create')}
                            className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        >
                            <span className="flex items-center gap-2">
                                <CirclePlus size={20} /> Add User
                            </span>
                        </Link>
                    </div>
                </div>

                <UsersTable users={users} />
            </div>
        </AppLayout>
    );
}
