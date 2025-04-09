//import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UsersTableProps {
    users?: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users = [] }) => {
    return (
        <Card className="mt-4 w-full">
            <CardContent className="overflow-x-auto p-4">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b">
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Correo</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    <Link
                                        as="button"
                                        className="ms-2 cursor-pointer rounded-md bg-blue-600 p-2 text-white hover:opacity-80"
                                        href={route('AdminUsers.edit', user.id)}
                                    >
                                        <Pencil size={20} />
                                    </Link>
                                    <Button
                                        as="button"
                                        className="ms-2 cursor-pointer rounded-md bg-red-600 p-2 text-white hover:opacity-80"
                                        onClick={(e) => {
                                            if (confirm('Are you sure you want to delete this user?')) {
                                                console.log(route('AdminUsers.destroy', user.id));
                                                router.delete(route('AdminUsers.destroy', user.id), {
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                    >
                                        <Trash2 size={20} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};

export default UsersTable;
