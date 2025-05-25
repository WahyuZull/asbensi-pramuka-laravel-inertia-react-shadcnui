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
        title: 'Tanda Kecakapan Khusus',
    },
];

export default function TkkIndex() {
    const { tandaKecakapanKhusus } = usePage().props;
    const { data, ...pagination } = tandaKecakapanKhusus;
    const { selectedTkk, setSelectedTkk } = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchTKK = (value) => {
        router.get(route('dashboard.tanda-kecakapan-khusus.index'), {
            ...queryParams,
            search: value,
        });
    };

    const { confirmDelete } = useConfirmDelete();
    const handleDeleteTKK = (id) => {
        confirmDelete({
            title: 'Delete TKK',
            description: 'Are you sure you want to delete this data?',
            onConfirm: () => router.delete(route('dashboard.tanda-kecakapan-khusus.destroy', id)),
        });
    };

    const tkkColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedTkk?.length === data?.length && data?.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedTkk(data?.map((kls) => kls.id));
                            } else {
                                setSelectedTkk([]);
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
                        checked={selectedTkk?.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedTkk([...selectedTkk, value]);
                            } else {
                                setSelectedTkk(selectedTkk?.filter((id) => id !== value));
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
            title: 'Nama',
            dataIndex: 'nama',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.tanda-kecakapan-khusus.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteTKK(value)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tanda Kecakapan Khusus" />
            <div className="container py-4">
                <Heading title="Tanda Kecakapan Khusus" description="Berikut adalah data tanda kecakapan khusus." />
                <div className="">
                    <Link href={route('dashboard.tanda-kecakapan-khusus.create')}>
                        <Button className="bg-green-700/80">
                            <Plus className="hidden md:block" />
                            Tambah TKK
                        </Button>
                    </Link>
                </div>
                <DataTable dataSource={data} columns={tkkColumns} pagination={pagination} searchable handleSearch={handleSearchTKK} />
            </div>
        </AppLayout>
    );
}
