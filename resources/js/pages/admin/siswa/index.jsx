import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useConfirmDelete } from '@/hooks/use-confirm-delete';
import AppLayout from '@/layouts/app-layout';
import { cn, GENDER_MAPPER, getAllQueryParams, GOLONGAN_PRAMUKA_MAPPER, NAMA_KELAS_MAPPER } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, FileDown, FileUp, Info, Plus, Printer, Trash } from 'lucide-react';
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
];

export default function SiswaIndex() {
    const { siswas, kelas } = usePage().props;
    const { data, ...pagination } = siswas;
    const [selectedSiswa, setSelectedSiswa] = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchSiswa = (value) => {
        router.get(route('dashboard.siswa.index'), {
            ...queryParams,
            search: value,
        });
    };

    const handleFilterSiswa = (value) => {
        router.get(route('dashboard.siswa.index'), {
            ...queryParams,
            filter: value,
        });
    };

    const kelasOptions = kelas.map((kls) => ({
        label: kls.nama_kelas,
        value: kls.slug,
    }));
    const filterOptions = [{ label: 'Semua', value: '' }, ...kelasOptions];

    const { confirmDelete } = useConfirmDelete();
    const handleDeleteSiswa = (id) => {
        confirmDelete({
            title: 'Delete User',
            description: 'Are you sure you want to delete this user?',
            onConfirm: () => router.delete(route('dashboard.siswa.destroy', id)),
        });
    };

    const handleCetakKartu = (value) => {
        const url = route('dashboard.export.siswa.print', value);
        window.open(url, '_blank');
    };

    const handleBulkCetakKartu = () => {
        if (selectedSiswa.length === 0) return;
        const url = route('dashboard.export.siswa.bulkPrint', { siswa_ids: selectedSiswa });
        window.open(url, '_blank');
    };

    const siswaColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedSiswa?.length === data?.length && data?.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedSiswa(data?.map((siswa) => siswa?.id));
                            } else {
                                setSelectedSiswa([]);
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
                        checked={selectedSiswa?.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedSiswa([...selectedSiswa, value]);
                            } else {
                                setSelectedSiswa(selectedSiswa?.filter((id) => id !== value));
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
            title: 'QR Code',
            dataIndex: 'qr_code_url',
            render: (value) => (
                <div className="flex items-center justify-center">
                    <div className="size-[50px] overflow-hidden rounded-md border bg-white p-1.5 shadow-sm">
                        <img src={value} className="size-full" alt="QR Code Siswa" />
                    </div>
                </div>
            ),
        },
        {
            title: 'NIS',
            dataIndex: 'nis',
            render: (value) => (
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-sm font-medium">{value}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Nama',
            dataIndex: 'nama_lengkap',
        },
        {
            title: 'Jenis Kelamin',
            dataIndex: 'jenis_kelamin',
            render: (value) => <Badge className={cn(GENDER_MAPPER[value])}>{value}</Badge>,
        },
        {
            title: 'Kelas',
            dataIndex: 'kelas',
            render: (value) => <Badge className={cn(NAMA_KELAS_MAPPER[value?.slug])}>{value.nama_kelas}</Badge>,
        },
        {
            title: 'Golongan Pramuka',
            dataIndex: 'golongan_pramuka',
            render: (value) => <Badge className={cn(GOLONGAN_PRAMUKA_MAPPER[value?.nama_golongan])}>{value.nama_golongan}</Badge>,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.siswa.show', value)}>
                            <Button variant="outline" size="icon">
                                <Info />
                            </Button>
                        </Link>
                        <Link href={route('dashboard.siswa.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteSiswa(value)}>
                            <Trash />
                        </Button>

                        <Button variant="outline" size="icon" onClick={() => handleCetakKartu(value)}>
                            <Printer />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Siswa" />
            <div className="container py-4">
                <Heading title="Siswa" description="Data daftar siswa" />
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard.siswa.create')}>
                        <Button className="bg-green-700/80">
                            <Plus />
                            <span className="hidden md:block">Tambah Siswa</span>
                        </Button>
                    </Link>
                    <Link href={route('dashboard.import.siswa.index')}>
                        <Button variant="outline">
                            <FileUp />
                            <span className="hidden md:block">Import</span>
                        </Button>
                    </Link>
                    <Link href={route('dashboard.export.siswa.index')}>
                        <Button variant="outline">
                            <FileDown />
                            <span className="hidden md:block">Export</span>
                        </Button>
                    </Link>

                    <Button variant="outline" disabled={selectedSiswa?.length === 0} onClick={handleBulkCetakKartu}>
                        <Printer />
                        <span className="hidden md:block">Cetak Kartu</span>
                    </Button>
                </div>

                <DataTable
                    dataSource={data}
                    columns={siswaColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchSiswa}
                    filterable
                    filterOptions={filterOptions}
                    handleFilter={handleFilterSiswa}
                    selectedRows={selectedSiswa?.length}
                />
            </div>
        </AppLayout>
    );
}
