import { FormComboBox } from '@/components/form-combobox';
import { FormField } from '@/components/form-field';
import { FormSelector } from '@/components/form-selector';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { STATUS_KEHADIRAN_OPTIONS } from '@/lib/utils';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Daftar Kehadiran',
        href: route('dashboard.kehadiran.index'),
    },
    {
        title: 'Manage Kehadiran',
    },
];

export default function ManageKehadiran() {
    const { siswa, kehadiran } = usePage().props;
    const title = kehadiran ? 'Edit Kehadiran' : 'Tambah Kehadiran';
    const siswaOptions = siswa?.map((siswa) => ({
        value: siswa?.id,
        label: siswa?.nama_lengkap,
    }));

    const {
        data,
        setData,
        processing,
        post,
        put: update,
        errors,
    } = useForm({
        siswa_id: kehadiran?.siswa_id ?? '',
        status: kehadiran?.status ?? '',
        keterangan: kehadiran?.keterangan ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (kehadiran) {
            update(route('dashboard.kehadiran.update', kehadiran.id), data);
        } else {
            post(route('dashboard.kehadiran.store'), data);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container py-4">
                <Heading title="Data Kehadiran" description="Manage data kehadiran." />
                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="w-full space-y-6">
                                <FormComboBox
                                    id="siswa_id"
                                    label="Nama Siswa"
                                    onSelect={(value) => {
                                        setData('siswa_id', value);
                                    }}
                                    options={siswaOptions}
                                    selectedOption={data?.siswa_id}
                                    placeholder="Pilih Siswa"
                                    error={errors?.siswa_id}
                                    disabled={data?.siswa_id}
                                />
                                <FormSelector
                                    id="status"
                                    label="Status Kehadiran"
                                    value={data?.status}
                                    options={STATUS_KEHADIRAN_OPTIONS}
                                    onChange={(value) => setData('status', value)}
                                    placeholder="Pilih Status Kehadiran"
                                    error={errors?.status}
                                />
                                <FormField
                                    id="keterangan"
                                    label="Keterangan"
                                    type="text"
                                    value={data?.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    error={errors.keterangan}
                                    placeholder="Masukkan Keterangan"
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={processing} onClick={handleSubmit}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
