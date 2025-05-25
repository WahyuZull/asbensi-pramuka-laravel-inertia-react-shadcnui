import { FormField } from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Users',
        href: route('dashboard.roles.index'),
    },
    {
        title: 'Manage Role',
    },
];

export default function ManageRole() {
    const { role } = usePage().props;
    const title = role ? 'Edit Role' : 'Buat Role';

    const {
        data,
        setData,
        post,
        put: update,
        processing,
        errors,
    } = useForm({
        name: role?.name ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role ? update(route('dashboard.roles.update', role.id)) : post(route('dashboard.roles.store')));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container py-4">
                <Heading title="Data Role" description="Manage data role." />

                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <FormField
                                label="Name"
                                id="name"
                                type="text"
                                value={data?.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder={'admin'}
                            />
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={processing} onClick={handleSubmit}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
