import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { cn, formatTanggal, STATUS_KEHADIRAN_MAPPER } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Rekap Kehadiran',
        href: route('dashboard.rekap-kehadiran.index'),
    },
    {
        title: 'Detail Rekap Kehadiran',
    },
];

export default function RekapKehadiranShow() {
    const { rekapSiswa } = usePage().props;

    const rekapSiswaColumns = [
        {
            title: 'No',
            render: (_, index) => index + 1,
        },
        {
            title: 'Jadwal Pertemuan',
            dataIndex: 'tanggal',
            render: (value) => <Badge className="border-blue-500 bg-blue-500/10 text-blue-500">{formatTanggal(value)}</Badge>,
        },
        {
            title: 'Status Kehadiran',
            render: (_, __, record) => {
                const kehadiran = rekapSiswa.kehadiran?.find(
                    (hadir) => new Date(hadir.tanggal).toDateString() === new Date(record.tanggal).toDateString(),
                );
                if (kehadiran?.status) {
                    return <Badge className={cn(STATUS_KEHADIRAN_MAPPER[kehadiran?.status], 'capitalize')}>{kehadiran?.status || '-'}</Badge>;
                }
                return '-';
            },
        },

        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            render: (value) => value || '-',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekap Kehadiran Siswa" />
            <div className="container py-4">
                <Heading title="Rekap Kehadiran Siswa" description={`Rekapitulasi Kehadiran ${rekapSiswa?.nama_lengkap.toUpperCase()}`} />

                <DataTable dataSource={rekapSiswa?.jadwal_pertemuan} columns={rekapSiswaColumns} />
            </div>
        </AppLayout>
    );
}
