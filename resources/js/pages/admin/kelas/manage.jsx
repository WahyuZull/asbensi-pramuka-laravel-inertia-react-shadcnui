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
        title: 'Kelas',
        href: route('dashboard.kelas.index'),
    },
    {
        title: 'Manage Kelas',
    },
];

export default function ManageKelas() {
    const { kelas } = usePage().props;
    const title = kelas ? 'Edit Kelas' : 'Tambah Kelas';

    const {
        data,
        setData,
        post,
        put: update,
        processing,
        errors,
    } = useForm({
        nama_kelas: kelas?.nama_kelas ?? '',
        slug: kelas?.slug ?? '',
    });

    useEffect(() => {
        if (data.nama_kelas) {
            setData('slug', slugify(data.nama_kelas, { lower: true, strict: true }));
        }
    }, [data.nama_kelas]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (kelas ? update(route('dashboard.kelas.update', kelas.id)) : post(route('dashboard.kelas.store')));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container py-4">
                <Heading title="Data Kelas" description="Manage data kelas." />

                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <FormField
                                label="Nama Kelas"
                                id="nama_kelas"
                                type="text"
                                value={data?.nama_kelas}
                                onChange={(e) => setData('nama_kelas', e.target.value)}
                                error={errors.nama_kelas}
                                placeholder={'3 A'}
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
