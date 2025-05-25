import { FormSelector } from '@/components/form-selector';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

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
        title: 'Export Siswa',
    },
];

export default function ExportSiswa() {
    const { kelas, golonganPramuka } = usePage().props;
    const kelasOptions = kelas?.map((kls) => ({
        value: String(kls.id),
        label: kls.nama_kelas,
    }));

    const golonganOptions = golonganPramuka?.map((gol) => ({
        value: String(gol.id),
        label: gol.nama_golongan,
    }));

    const [data, setData] = useState({
        kelas_id: '',
        golongan_pramuka_id: '',
    });

    const handleDownloadSiswa = () => {
        const params = new URLSearchParams(data).toString();
        const url = route('dashboard.export.siswa.download') + `?${params}`;
        window.open(url, '_blank');
        setData({
            kelas_id: '',
            golongan_pramuka_id: '',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Siswa" />
            <div className="container py-4">
                <Heading title="Export Siswa" description="Manage data export siswa." />
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Form Export Siswa</CardTitle>
                            <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="w-full space-y-6">
                                    <FormSelector
                                        label="Kelas"
                                        id="kelas_id"
                                        value={kelasOptions.find((opt) => opt.value === data?.kelas_id)}
                                        options={kelasOptions}
                                        onChange={(value) => setData({ ...data, kelas_id: parseInt(value) })}
                                        placeholder="Pilih Kelas"
                                    />
                                    <FormSelector
                                        label="Golongan Pramuka"
                                        id="golongan_pramuka_id"
                                        value={golonganOptions.find((opt) => opt.value === data?.golongan_pramuka_id)}
                                        options={golonganOptions}
                                        onChange={(value) => setData({ ...data, golongan_pramuka_id: parseInt(value) })}
                                        placeholder="Pilih Golongan Pramuka"
                                    />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleDownloadSiswa}>Download Data</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
