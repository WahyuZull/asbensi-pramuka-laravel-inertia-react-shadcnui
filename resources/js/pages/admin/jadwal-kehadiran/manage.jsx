import FormDatePicker from '@/components/form-date-picker';
import { FormSelector } from '@/components/form-selector';
import FormTimePicker from '@/components/form-time-picker';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Jadwal Kehadiran',
        href: route('dashboard.jadwal-kehadiran.index'),
    },
    {
        title: 'Manage Jadwal Kehadiran',
    },
];

export default function ManageJadwalKehadiran() {
    const { kelas, jadwalKehadiran } = usePage().props;
    const title = jadwalKehadiran ? 'Edit Jadwal Kehadiran' : 'Tambah Jadwal Kehadiran';

    const hariOptions = [
        { value: 'Minggu', label: 'Minggu' },
        { value: 'Senin', label: 'Senin' },
        { value: 'Selasa', label: 'Selasa' },
        { value: 'Rabu', label: 'Rabu' },
        { value: 'Kamis', label: 'Kamis' },
        { value: 'Jumat', label: 'Jumat' },
        { value: 'Sabtu', label: 'Sabtu' },
    ];

    const kelasOptions = kelas?.map((kls) => ({
        value: String(kls.id),
        label: kls.nama_kelas,
    }));


    const {
        data,
        setData,
        processing,
        post,
        put: update,
        errors,
    } = useForm({
        hari: jadwalKehadiran?.hari ?? '',
        tanggal: jadwalKehadiran?.tanggal
            ? new Date(jadwalKehadiran?.tanggal)
                  .toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' })
                  .split('/')
                  .reverse()
                  .join('-')
            : '',
        mulai_absen: jadwalKehadiran?.mulai_absen ?? '',
        selesai_absen: jadwalKehadiran?.selesai_absen ?? '',
        kelas_id: jadwalKehadiran?.kelas_id ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit data
        if (jadwalKehadiran) {
            update(route('dashboard.jadwal-kehadiran.update', jadwalKehadiran.id), data);
        } else {
            post(route('dashboard.jadwal-kehadiran.store'), data);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container py-4">
                <Heading title="Data Jadwal Kehadiran" description="Manage data jadwal kehadiran." />
                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full space-y-6">
                                {/* Form Tanggal */}
                                <FormDatePicker
                                    id="tanggal"
                                    label="Tanggal"
                                    date={data.tanggal}
                                    onSelect={(value) => {
                                        setData(
                                            'tanggal',
                                            new Date(value)
                                                .toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                .split('/')
                                                .reverse()
                                                .join('-'),
                                        );
                                        setData('hari', hariOptions[new Date(value).getDay()].value);
                                        console.log(new Date(value).getDay());
                                    }}
                                    placeholder="Pilih Tanggal"
                                    error={errors.tanggal}
                                />

                                {/* Form Hari */}
                                <FormSelector
                                    label="Hari"
                                    id="hari"
                                    options={hariOptions}
                                    value={data?.hari}
                                    onChange={(value) => setData('hari', value)}
                                    error={errors.hari}
                                    placeholder="Pilih Hari"
                                />

                                {/* Form Jam */}
                                <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                                    <FormTimePicker
                                        id="mulai_absen"
                                        label="Absen Mulai"
                                        value={data.mulai_absen}
                                        onChange={(value) => setData('mulai_absen', value)}
                                        error={errors.mulai_absen}
                                    />
                                    <FormTimePicker
                                        id="selesai_absen"
                                        label="Absen Selesai"
                                        value={data.selesai_absen}
                                        onChange={(value) => setData('selesai_absen', value)}
                                    />
                                </div>

                                {/* Form Kelas */}
                                <FormSelector
                                    label="Kelas"
                                    id="kelas_id"
                                    value={kelasOptions.find((opt) => opt.value === data?.kelas_id)}
                                    options={kelasOptions}
                                    onChange={(value) => setData('kelas_id', parseInt(value))}
                                    error={errors.kelas_id}
                                    placeholder="Pilih Kelas"
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
