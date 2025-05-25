import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useConfirmDelete } from '@/hooks/use-confirm-delete';
import AppLayout from '@/layouts/app-layout';
import { getAllQueryParams } from '@/lib/utils';
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
        title: 'Kelas',
        href: route('dashboard.kelas.index'),
    },
];

export default function KelasIndex() {
    const { kelas } = usePage().props;
    const { data, ...pagination } = kelas;
    const [selectedKelas, setSelectedKelas] = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchKelas = (value) => {
        router.get(route('dashboard.kelas.index'), {
            ...queryParams,
            search: value,
        });
    };

    const { confirmDelete } = useConfirmDelete();
    const handleDeleteKelas = (id) => {
        confirmDelete({
            title: 'Delete Kelas',
            description: 'Are you sure you want to delete this Kelas?',
            onConfirm: () => router.delete(route('dashboard.kelas.destroy', id)),
        });
    };

    const kelasColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedKelas?.length === data?.length && data?.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedKelas(data?.map((kls) => kls.id));
                            } else {
                                setSelectedKelas([]);
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
                        checked={selectedKelas.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedKelas([...selectedKelas, value]);
                            } else {
                                setSelectedKelas(selectedKelas.filter((id) => id !== value));
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
            title: 'Nama Kelas',
            dataIndex: 'nama_kelas',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.kelas.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteKelas(value)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelas" />
            <div className="container py-4">
                <Heading title="Kelas" description="Data daftar kelas" />
                <div className="">
                    <Link href={route('dashboard.kelas.create')}>
                        <Button className="bg-green-700/80">
                            <Plus className="hidden md:block" />
                            Tambah Kelas
                        </Button>
                    </Link>
                </div>
                <DataTable
                    dataSource={data}
                    columns={kelasColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchKelas}
                    selectedRows={selectedKelas.length}
                />
            </div>
        </AppLayout>
    );
}
