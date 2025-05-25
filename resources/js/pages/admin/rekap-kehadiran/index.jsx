import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { cn, getAllQueryParams, NAMA_KELAS_MAPPER, STATUS_KEHADIRAN_MAPPER } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Rekap Daftar Kehadiran',
    },
];

export default function RekapKehadiranIndex() {
    const { rekapKehadiran, kelas } = usePage().props;
    const { data, ...pagination } = rekapKehadiran;
    const [selectedRekapKehadiran, setRekapKehadiranSiswa] = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchKehadiran = (value) => {
        router.get(route('dashboard.rekap-kehadiran.index'), {
            ...queryParams,
            search: value,
        });
    };

    const handleFilterKehadiran = (value) => {
        router.get(route('dashboard.rekap-kehadiran.index'), {
            ...queryParams,
            filter: value,
        });
    };

    const kelasOptions = kelas.map((kls) => ({
        label: kls.nama_kelas,
        value: kls.slug,
    }));
    const filterOptions = [{ label: 'Semua', value: '' }, ...kelasOptions];

    const rekapKehadiranColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedRekapKehadiran?.length === data?.length && data?.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setRekapKehadiranSiswa(data?.map((hadir) => hadir?.id));
                            } else {
                                setRekapKehadiranSiswa([]);
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
                        checked={selectedRekapKehadiran.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setRekapKehadiranSiswa([...selectedRekapKehadiran, value]);
                            } else {
                                setRekapKehadiranSiswa(selectedRekapKehadiran.filter((id) => id !== value));
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
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.rekap-kehadiran.show', value)}>
                            <Button variant="outline" size="icon">
                                <Info />
                            </Button>
                        </Link>
                    </div>
                );
            },
        },
        {
            title: 'Nama Siswa',
            dataIndex: 'nama_lengkap',
            render: (value) => <span className="capitalize">{value}</span>,
        },
        {
            title: 'Kelas',
            dataIndex: 'kelas',
            render: (value) => <Badge className={cn(NAMA_KELAS_MAPPER[value?.slug])}>{value.nama_kelas}</Badge>,
        },
        {
            title: 'Jumlah Pertemuan',
            dataIndex: 'jadwal_pertemuan',
            render: (value) => (
                <div className="flex items-center justify-center">
                    <span className="text-center text-lg font-bold slashed-zero tabular-nums">{value.length}</span>
                </div>
            ),
        },
        {
            title: 'Absensi',
            dataIndex: 'kehadiran',
            items: [
                {
                    title: 'Sakit',
                    dataIndex: 'kehadiran',
                    render: (value) => (
                        <Badge className={cn(STATUS_KEHADIRAN_MAPPER['sakit'], 'slashed-zero tabular-nums')}>
                            {value.filter((hadir) => hadir.status === 'sakit').length}
                        </Badge>
                    ),
                },
                {
                    title: 'Izin',
                    dataIndex: 'kehadiran',
                    render: (value) => (
                        <Badge className={cn(STATUS_KEHADIRAN_MAPPER['izin'], 'slashed-zero tabular-nums')}>
                            {value.filter((hadir) => hadir.status === 'izin').length}
                        </Badge>
                    ),
                },
                {
                    title: 'Alpa',
                    dataIndex: 'kehadiran',
                    render: (value) => (
                        <Badge className={cn(STATUS_KEHADIRAN_MAPPER['alpa'], 'slashed-zero tabular-nums')}>
                            {value.filter((hadir) => hadir.status === 'alpa').length}
                        </Badge>
                    ),
                },
            ],
        },

        {
            title: 'Jumlah Kehadiran',
            dataIndex: 'kehadiran',
            render: (value) => (
                <div className="flex items-center justify-center">
                    <span className="text-center text-lg font-bold slashed-zero tabular-nums">
                        {value.filter((hadir) => hadir.status === 'hadir').length}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekap Daftar Kehadiran" />
            <div className="container py-4">
                <Heading title="Rekap Daftar Kehadiran" description="Data rekapitulasi kehadiran siswa" />

                <DataTable
                    dataSource={data}
                    columns={rekapKehadiranColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchKehadiran}
                    selectedRows={selectedRekapKehadiran.length}
                    filterable
                    filterLabel={'Kelas'}
                    filterOptions={filterOptions}
                    handleFilter={handleFilterKehadiran}
                />
            </div>
        </AppLayout>
    );
}
