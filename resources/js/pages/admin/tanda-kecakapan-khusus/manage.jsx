import { FormField } from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import slugify from 'slugify';

export default function TKKManage() {
    const { tandaKecakapanKhusus } = usePage().props;
    const title = tandaKecakapanKhusus ? 'Edit Tanda Kecakapan Khusus' : 'Tambah Tanda Kecakapan Khusus';

    const {
        data,
        setData,
        post,
        put: update,
        processing,
        errors,
    } = useForm({
        nama: tandaKecakapanKhusus?.nama ?? '',
        slug: tandaKecakapanKhusus?.slug ?? '',
    });

    useEffect(() => {
        if (data.nama) {
            setData('slug', slugify(data.nama, { lower: true, strict: true }));
        }
    }, [data.nama]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            tandaKecakapanKhusus
                ? update(route('dashboard.tanda-kecakapan-khusus.update', tandaKecakapanKhusus.id))
                : post(route('dashboard.tanda-kecakapan-khusus.store'))
        );
    };

    return (
        <AppLayout>
            <Head title="Manage Tanda Kecakapan Khusus" />
            <div className="container py-4">
                <Heading title="Data Tanda Kecakapan Khusus" description="Manage data tanda kecakapan khusus." />

                <Card className="w-[380px]">
                    <CardHeader>
                        <CardTitle>Form {title}</CardTitle>
                        <CardDescription>Klik simpan ketika sudah selesai.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <FormField
                                label="Nama TKK"
                                id="nama_tkk"
                                type="text"
                                value={data?.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                error={errors?.nama}
                                placeholder="Nama TKK"
                            />
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
