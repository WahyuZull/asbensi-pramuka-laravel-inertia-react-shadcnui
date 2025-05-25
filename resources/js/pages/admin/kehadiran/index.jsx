import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useConfirmDelete } from '@/hooks/use-confirm-delete';
import AppLayout from '@/layouts/app-layout';
import { cn, getAllQueryParams, NAMA_KELAS_MAPPER, STATUS_KEHADIRAN_MAPPER, timeFormatLocale } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import QRCodeForm from './partials/qrcode-scanner-form';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Daftar Kehadiran',
    },
];

export default function KehadiranIndex() {
    const { kehadiran } = usePage().props;
    const { data, ...pagination } = kehadiran;
    const [selectedKehadiran, setKehadiranSiswa] = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchKehadiran = (value) => {
        router.get(route('dashboard.kehadiran.index'), {
            ...queryParams,
            search: value,
        });
    };

    const { confirmDelete } = useConfirmDelete();
    const handleDeleteKehadiran = (id) => {
        confirmDelete({
            title: 'Delete Kehadiran',
            description: 'Are you sure you want to delete this data?',
            onConfirm: () => router.delete(route('dashboard.kehadiran.destroy', id)),
        });
    };

    const kehadiranColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedKehadiran?.length === data?.length && data?.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setKehadiranSiswa(data?.map((hadir) => hadir?.id));
                            } else {
                                setKehadiranSiswa([]);
                            }
                        }}
                        aria-label="Select all"
                    />
                </div>
            ),
            dataIndex: 'id',
            render: (value) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedKehadiran.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setKehadiranSiswa([...selectedKehadiran, value]);
                            } else {
                                setKehadiranSiswa(selectedKehadiran.filter((id) => id !== value));
                            }
                        }}
                        aria-label="Select row"
                    />
                </div>
            ),
        },
        {
            title: 'No',
            render: (_, index) => index + 1,
        },
        {
            title: 'Hari, Tanggal, Jam',
            dataIndex: 'tanggal',
            render: (value) => <Badge className="border-blue-500 bg-blue-500/10 text-blue-500">{timeFormatLocale(value)}</Badge>,
        },
        {
            title: 'Nama',
            dataIndex: 'siswa',
            render: (value) => <span className="capitalize">{value.nama_lengkap}</span>,
        },
        {
            title: 'Kelas',
            dataIndex: 'kelas',
            render: (value) => <Badge className={cn(NAMA_KELAS_MAPPER[value?.slug])}>{value.nama_kelas}</Badge>,
        },
        {
            title: 'Status Kehadiran',
            dataIndex: 'status',
            render: (value) => <Badge className={cn(STATUS_KEHADIRAN_MAPPER[value])}>{value.toUpperCase()}</Badge>,
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            render: (value) => <span>{value ?? '-'}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.kehadiran.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteKehadiran(value)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kehadiran" />
            <div className="container py-4">
                <Heading title="Daftar Kehadiran" description="Data daftar kehadiran siswa" />
                <div className="flex items-center gap-4">
                    <QRCodeForm />

                    <Link href={route('dashboard.kehadiran.create')}>
                        <Button className="bg-green-700/80">
                            <Plus />
                            <span className="block">Tambah Kehadiran</span>
                        </Button>
                    </Link>
                </div>

                <DataTable
                    dataSource={data}
                    columns={kehadiranColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchKehadiran}
                    selectedRows={selectedKehadiran.length}
                />
            </div>
        </AppLayout>
    );
}
