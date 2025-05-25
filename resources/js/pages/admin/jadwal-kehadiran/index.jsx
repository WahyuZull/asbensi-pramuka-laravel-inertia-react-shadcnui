import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useConfirmDelete } from '@/hooks/use-confirm-delete';
import AppLayout from '@/layouts/app-layout';
import { cn, formatTanggal, getAllQueryParams, NAMA_KELAS_MAPPER } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Jadwal Kehadiran',
    },
];

export default function JadwalKehadiranIndex() {
    const { jadwalKehadiran, kelas } = usePage().props;
    const { data, ...pagination } = jadwalKehadiran;
    const [selectedJadwalKehadiran, setJadwalKehadiranSiswa] = useState([]);
    const { confirmDelete } = useConfirmDelete();

    const kelasOptions = kelas.map((kls) => ({
        label: kls.nama_kelas,
        value: kls.slug,
    }));

    const filterOptions = [{ label: 'Semua', value: '' }, ...kelasOptions];

    const queryParams = getAllQueryParams();
    const handleSearchJadwalKehadiran = (search) => {
        router.get(route('dashboard.jadwal-kehadiran.index'), {
            ...queryParams,
            search: search,
        });
    };

    const handleFilterJadwalKehadiran = (filter) => {
        router.get(route('dashboard.jadwal-kehadiran.index'), {
            ...queryParams,
            filter: filter,
        });
    };

    const handleDeleteJadwalKehadiran = (id) => {
        confirmDelete({
            title: 'Delete Jadwal Kehadiran',
            description: 'Are you sure you want to delete this data?',
            onConfirm: () => router.delete(route('dashboard.jadwal-kehadiran.destroy', id)),
        });
    };

    const jadwalKehadiranColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedJadwalKehadiran?.length === data?.length && data?.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setJadwalKehadiranSiswa(data?.map((hadir) => hadir?.id));
                            } else {
                                setJadwalKehadiranSiswa([]);
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
                        checked={selectedJadwalKehadiran.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setJadwalKehadiranSiswa([...selectedJadwalKehadiran, value]);
                            } else {
                                setJadwalKehadiranSiswa(selectedJadwalKehadiran.filter((id) => id !== value));
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
            title: 'Hari',
            dataIndex: 'hari',
        },
        {
            title: 'Tanggal',
            dataIndex: 'tanggal',
            render: (value) => <Badge className="border-blue-500 bg-blue-500/10 text-blue-500">{formatTanggal(value)}</Badge>,
        },
        {
            title: 'Kelas',
            dataIndex: 'kelas',
            render: (value) => <Badge className={cn(NAMA_KELAS_MAPPER[value?.slug])}>{value.nama_kelas}</Badge>,
        },
        {
            title: 'Mulai Absen',
            dataIndex: 'mulai_absen',
        },
        {
            title: 'Selesai Absen',
            dataIndex: 'selesai_absen',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.jadwal-kehadiran.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteJadwalKehadiran(value)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Kehadiran" />
            <div className="container py-4">
                <Heading title="Jadwal Kehadiran" description="Data daftar jadwal kehadiran" />
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard.jadwal-kehadiran.create')}>
                        <Button className="bg-green-700/80">
                            <Plus />
                            <span className="block">Tambah Jadwal</span>
                        </Button>
                    </Link>
                </div>

                <DataTable
                    dataSource={data}
                    columns={jadwalKehadiranColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchJadwalKehadiran}
                    selectedRows={selectedJadwalKehadiran.length}
                    filterable
                    filterOptions={filterOptions}
                    handleFilter={handleFilterJadwalKehadiran}
                />
            </div>
        </AppLayout>
    );
}
