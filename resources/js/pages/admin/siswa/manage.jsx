import Heading from '@/components/heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import SiswaForm from './partials/siswa-form';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Siswa',
        href: route('dashboard.siswa.index'),
    },
    {
        title: 'Manage Siswa',
    },
];

export default function ManageSiswa() {
    const { siswa, kelas, golonganPramuka, tandaKecakapanKhusus } = usePage().props;
    const title = siswa ? 'Edit Siswa' : 'Tambah Siswa';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Siswa" />
            <div className="container py-4">
                <Heading title="Data Siswa" description="Manage data siswa." />

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <SiswaForm siswa={siswa} kelas={kelas} golonganPramuka={golonganPramuka} tandaKecakapanKhusus={tandaKecakapanKhusus} />
                </Card>
            </div>
        </AppLayout>
    );
}
