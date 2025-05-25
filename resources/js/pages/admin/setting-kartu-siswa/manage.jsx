import { FormField } from '@/components/form-field';
import { FormSelector } from '@/components/form-selector';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Kartu Siswa',
        href: route('dashboard.setting-kartu-siswa.index'),
    },
    {
        title: 'Manage Kartu Siswa',
    },
];

export default function ManageKartuSiswa() {
    const { kartuSiswa } = usePage().props;
    const title = kartuSiswa ? 'Edit Kartu Siswa' : 'Tambah Kartu Siswa';
    const inputImageRef = useRef(null);

    const {
        data,
        setData,
        post,
        put: update,
        processing,
        errors,
    } = useForm({
        cover: kartuSiswa?.cover ?? '',
        gambar_cover: kartuSiswa?.gambar_cover ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (kartuSiswa ? update(route('dashboard.setting-kartu-siswa.update', kartuSiswa.id)) : post(route('dashboard.setting-kartu-siswa.store')));
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
                            <div className="space-y-6">
                                <FormSelector
                                    label="Tipe Cover"
                                    id="cover"
                                    value={data?.cover}
                                    onChange={(value) => setData('cover', value)}
                                    error={errors.cover}
                                    placeholder={'Pilih tipe cover'}
                                    options={[
                                        { value: 'depan', label: 'Depan' },
                                        { value: 'belakang', label: 'Belakang' },
                                    ]}
                                />
                                <FormField
                                    type="file"
                                    label="Gambar Cover"
                                    id="gambar_cover"
                                    ref={inputImageRef}
                                    onChange={(e) => setData('gambar_cover', e.target.files[0])}
                                    error={errors.gambar_cover}
                                    placeholder={'Pilih gambar'}
                                    accept="image/*"
                                />
                            </div>
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
