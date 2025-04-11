import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { RocketIcon, ShieldIcon, StoreIcon, User2, UserIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-6">
                {/* Bienvenida */}
                <div>
                    <h1 className="text-3xl font-bold">Bienvenido al Sistema AutoMarket 🚗</h1>
                    <p className="text-muted-foreground mt-2 max-w-3xl">
                        Este panel resume las funcionalidades del sistema de compraventa de autos usados y refacciones, desarrollado bajo el framework
                        Laravel + React + Inertia.js. Aquí podrás conocer las vistas, módulos disponibles y las diferencias entre usuarios.
                    </p>
                </div>

                <Separator />

                {/* Funcionalidades Principales */}
                <section>
                    <h2 className="mb-2 text-xl font-semibold">🔧 Funcionalidades principales del sistema</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <Card>
                            <CardContent className="space-y-2 p-4">
                                <StoreIcon className="text-primary" />
                                <h3 className="font-medium">Publicación de productos</h3>
                                <p className="text-muted-foreground text-sm">
                                    Usuarios registrados pueden publicar autos usados, agregando fotos, descripciones, precios y ubicación, etc.
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="space-y-2 p-4">
                                <User2 className="text-primary" />
                                <h3 className="font-medium">Sistema de administracion de usuarios / administradores</h3>
                                <p className="text-muted-foreground text-sm">Controlor de usuarios por medio de privilegios de administrador.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="space-y-2 p-4">
                                <RocketIcon className="text-primary" />
                                <h3 className="font-medium">Sistema de búsqueda y filtros</h3>
                                <p className="text-muted-foreground text-sm">
                                    Permite encontrar productos por título, descripción, marca, modelo, año, tipo de combustible, etc.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Usuarios */}
                <section>
                    <h2 className="mt-6 mb-2 text-xl font-semibold">👥 Roles de usuario</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardContent className="space-y-2 p-4">
                                <UserIcon className="text-blue-500" />
                                <h3 className="font-medium">Usuarios normales</h3>
                                <ul className="text-muted-foreground list-inside list-disc text-sm">
                                    <li>Registro e inicio de sesión</li>
                                    <li>Publicar autos y refacciones</li>
                                    <li>Editar o eliminar sus publicaciones</li>
                                    <li>Chatear con vendedores</li>
                                    <li>Consultar historial de publicaciones</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="space-y-2 p-4">
                                <ShieldIcon className="text-red-500" />
                                <h3 className="font-medium">Administradores</h3>
                                <ul className="text-muted-foreground list-inside list-disc text-sm">
                                    <li>Gestión completa de usuarios</li>
                                    <li>Moderación de productos</li>
                                    <li>Acceso a métricas del sistema</li>
                                    <li>Ver y eliminar comentarios ofensivos</li>
                                    <li>Acceso a paneles adicionales de configuración</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Etiquetas Finales */}
                <section className="mt-8">
                    <h2 className="mb-2 text-xl font-semibold">📌 Tecnologías usadas</h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Laravel 12</Badge>
                        <Badge variant="outline">React + Vite</Badge>
                        <Badge variant="outline">Inertia.js</Badge>
                        <Badge variant="outline">Tailwind CSS</Badge>
                        <Badge variant="outline">MySQL</Badge>
                        <Badge variant="outline">ShadCN UI</Badge>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
