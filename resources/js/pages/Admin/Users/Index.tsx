import UserModal from '@/components/admin/UserModal';
import UsersTable from '@/components/admin/UsersTable';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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

    // const editUser = (user: User) => {
    //     setUserModel(user);
    //     showAddNewModal();
    // };

    const onModalClose = () => {
        setUserModel({ ...DEFAULT_USER });
        setShowUserModal(false);
    };

    const editUser = (user: User) => {
        // Redirigir al formulario de edición mediante un enlace
        window.location.href = `/admin/users/${user.id}/edit`;
    };

    const deleteUser = (userId: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            // Aquí se ejecuta la acción para eliminar el usuario
            window.location.href = `/admin/users/${userId}`;
        }
    };

    /*
       // Eliminar despues de pruebas
    */
    console.log(users);
    console.log(auth);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Usuarios</h1>
                    <button
                        type="button"
                        onClick={showAddNewModal}
                        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Agregar nuevo usuario
                    </button>
                </div>

                <UsersTable users={users} />
                {showUserModal && (
                    <UserModal
                        open={showUserModal} // <-- esta era `show`, ahora debe ser `open`
                        user={userModel}
                        onClose={onModalClose}
                        onChange={() => {}} // temporal mientras defines el cambio
                        onSubmit={() => {}} // temporal mientras defines el submit
                        isEditing={userModel.id !== 0}
                    />
                )}
            </div>
        </AppLayout>
    );
}
