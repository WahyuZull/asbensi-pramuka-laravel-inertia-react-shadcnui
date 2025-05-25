import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
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
        title: 'Import Siswa',
    },
];

export default function ImportSiswa() {
    const { kelas, golonganPramuka } = usePage().props;
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const data = e.target.files[0];
        setFile(data);
    };

    const handleUploadImportSiswa = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('_method', 'POST');
        router.post(route('dashboard.import.siswa.upload'), formData);

        inputRef.current.value = null;
        setFile(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Import Siswa" />
            <div className="container py-4">
                <Heading title="Import Siswa" description="Manage data import siswa." />

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Form Import Siswa</CardTitle>
                            <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="w-full space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="file">File Data Siswa</Label>
                                        <Input type="file" accept=".xlsx" ref={inputRef} onChange={handleFileChange} />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleUploadImportSiswa} disabled={!file}>
                                Simpan
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Sheet template import siswa */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Template Import Siswa</CardTitle>
                            <CardDescription>Download template untuk mengimpor siswa.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                            <a
                                href={route('dashboard.import.siswa.downloadTemplate')}
                                download
                                className="bg-primary hover:bg-primary/80 focus:ring-primary rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                            >
                                Download Template
                            </a>
                        </CardContent>
                        <CardFooter>
                            <p className="text-muted-foreground text-sm">Format file: .xlsx</p>
                        </CardFooter>
                    </Card>
                </div>

                {/* Table referensi id kelas dan id golongan pramuka */}
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Referensi ID Kelas</CardTitle>
                            <CardDescription>Daftar ID untuk setiap kelas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-xs uppercase">
                                        <tr>
                                            <th className="px-6 py-3">ID</th>
                                            <th className="px-6 py-3">Kelas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kelas.map((kelas, index) => (
                                            <tr key={index} className="border-b bg-white">
                                                <td className="px-6 py-4">{kelas.id}</td>
                                                <td className="px-6 py-4">{kelas.nama_kelas}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Referensi ID Golongan Pramuka</CardTitle>
                            <CardDescription>Daftar ID untuk setiap golongan pramuka</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-xs uppercase">
                                        <tr>
                                            <th className="px-6 py-3">ID</th>
                                            <th className="px-6 py-3">Golongan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {golonganPramuka.map((golongan, index) => (
                                            <tr key={index} className="border-b bg-white">
                                                <td className="px-6 py-4">{golongan.id}</td>
                                                <td className="px-6 py-4">{golongan.nama_golongan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
