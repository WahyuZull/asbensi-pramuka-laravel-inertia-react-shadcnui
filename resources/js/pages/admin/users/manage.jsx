import Heading from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import UserForm from './partials/user-form';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Users',
        href: route('dashboard.users.index'),
    },
    {
        title: 'Manage User',
    },
];

export default function ManageUser() {
    const { user, roles } = usePage().props;
    const title = user ? 'Edit User' : 'Buat User';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container py-4">
                <Heading title="Data User" description="Manage data user." />

                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <UserForm user={user} roles={roles} />
                </Card>
            </div>
        </AppLayout>
    );
}
