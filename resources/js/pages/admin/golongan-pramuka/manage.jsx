import { FormField } from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import slugify from 'slugify';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Golongan Pramuka',
        href: route('dashboard.golongan-pramuka.index'),
    },
    {
        title: 'Manage Golongan Pramuka',
    },
];

export default function ManageGolonganPramuka() {
    const { golongan } = usePage().props;
    const title = golongan ? 'Edit Golongan Pramuka' : 'Tambah Golongan Pramuka';

    const {
        data,
        setData,
        post,
        put: update,
        processing,
        errors,
    } = useForm({
        nama_golongan: golongan?.nama_golongan ?? '',
        slug: golongan?.slug ?? '',
    });

    useEffect(() => {
        if (data.nama_golongan) {
            setData('slug', slugify(data.nama_golongan, { lower: true, strict: true }));
        }
    }, [data.nama_golongan]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (golongan ? update(route('dashboard.golongan-pramuka.update', kelas.id)) : post(route('dashboard.golongan-pramuka.store')));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container py-4">
                                <Heading title="Data Golongan Pramuka" description="Manage data golongan Pramuka." />

                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <FormField
                                label="Nama Golongan"
                                id="nama_golongan"
                                type="text"
                                value={data?.nama_golongan}
                                onChange={(e) => setData('nama_golongan', e.target.value)}
                                error={errors.nama_golongan}
                                placeholder={'Penggalang'}
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
