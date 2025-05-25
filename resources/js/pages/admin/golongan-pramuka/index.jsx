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

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Golongan Pramuka',
        href: route('dashboard.golongan-pramuka.index'),
    },
];

export default function GolonganPramukaIndex() {
    const { golongans } = usePage().props;
    const { data, ...pagination } = golongans;
    const [selectedGolongan, setSelectedGolongan] = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchGolonganPramuka = (value) => {
        router.get(route('dashboard.golongan-pramuka.index'), {
            ...queryParams,
            search: value,
        });
    };

    const { confirmDelete } = useConfirmDelete();
    const handleDeleteGolonganPramuka = (id) => {
        confirmDelete({
            title: 'Delete Golongan Pramuka',
            description: 'Are you sure you want to delete this Golongan Pramuka?',
            onConfirm: () => router.delete(route('dashboard.golongan-pramuka.destroy', id)),
        });
    };

    const golonganColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedGolongan.length === data.length && data.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedGolongan(data.map((gol) => gol.id));
                            } else {
                                setSelectedGolongan([]);
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
                        checked={selectedGolongan.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedGolongan([...selectedGolongan, value]);
                            } else {
                                setSelectedGolongan(selectedGolongan.filter((id) => id !== value));
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
            title: 'Nama Golongan',
            dataIndex: 'nama_golongan',
        },
        {
            title: 'Aksi',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex gap-2">
                        <Link href={route('dashboard.golongan-pramuka.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteGolonganPramuka(value)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Golongan Pramuka" />
            <div className="container py-4">
                <Heading title="Golongan Pramuka" description="Data daftar golongan pramuka" />

                <div className="">
                    <Link href={route('dashboard.golongan-pramuka.create')}>
                        <Button className="bg-green-700/80">
                            <Plus className="hidden md:block" />
                            Tambah Golongan Pramuka
                        </Button>
                    </Link>
                </div>
                <DataTable
                    dataSource={data}
                    columns={golonganColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchGolonganPramuka}
                    selectedRows={selectedGolongan.length}
                />
            </div>
        </AppLayout>
    );
}
