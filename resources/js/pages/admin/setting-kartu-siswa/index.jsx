import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { useConfirmDelete } from '@/hooks/use-confirm-delete';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Settings, Trash } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs = [
    { title: 'Dashboard', href: route('dashboard.index') },
    { title: 'Kartu Siswa', href: route('dashboard.setting-kartu-siswa.index') },
];

export default function KartuSiswaIndex() {
    const { kartuSiswa } = usePage().props;
    const { confirmDelete } = useConfirmDelete();

    const handleDeleteKartu = (id) => {
        confirmDelete({
            title: 'Delete Kartu',
            description: 'Are you sure you want to delete this Kartu?',
            onConfirm: () => router.delete(route('dashboard.setting-kartu-siswa.destroy', id)),
        });
    };

    const columnsKartuSiswa = [
        {
            title: 'No',
            render: (_, index) => index + 1,
        },
        {
            title: 'Gambar',
            dataIndex: 'url',
            render: (value) => {
                return (
                    <div className="flex items-center justify-center">
                        <div style={{ aspectRatio: '85.60 / 53.98' }} className="h-[calc(53px*2)] w-[calc(85px*2)]">
                            <img src={value} alt="cover" className="h-full w-full rounded-sm object-cover" />
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Nama',
            dataIndex: 'cover',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                                handleDeleteKartu(value);
                            }}
                        >
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kartu Siswa" />
            <div className="container py-4">
                <Heading title="Setting Kartu Siswa" description="Pengaturan kartu siswa" />
                <div className="mb-4">
                    <Link href={route('dashboard.setting-kartu-siswa.create')}>
                        <Button className="bg-green-700/80">
                            <Settings className="hidden md:block" />
                            Pengaturan Kartu Siswa
                        </Button>
                    </Link>
                </div>
                <DataTable dataSource={kartuSiswa} columns={columnsKartuSiswa} pagination={false} />
            </div>
        </AppLayout>
    );
}
