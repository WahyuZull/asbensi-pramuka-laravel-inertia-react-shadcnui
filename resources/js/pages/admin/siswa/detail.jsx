import Heading from '@/components/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import TabProfile from './partials/tab-profile';
import TabTKKSiswa from './partials/tab-tkk';
import KartuSiswa from './components/kartu-depan-siswa';
import TabKartuSiswa from './partials/tab-kartu-siswa';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Siswa',
        href: route('dashboard.siswa.index'),
    },
    {
        title: 'Detil Siswa',
    },
];

export default function DetailSiswa() {
    const { siswa, kartu, tandaKecakapanKhusus } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detil Siswa" />
            <div className="container py-4">
                <Heading title="Detil Siswa" description="Berikut adalah detil siswa." />

                <Tabs defaultValue="profile" className="w-[400px] md:w-[600px] lg:w-[800px]">
                    <TabsList>
                        <TabsTrigger value="profile">Profil</TabsTrigger>
                        <TabsTrigger value="tkk_pramuka">Kecakapan Khusus</TabsTrigger>
                        <TabsTrigger value="kartu_siswa">Kartu Siswa</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <TabProfile siswa={siswa} />
                    </TabsContent>
                    <TabsContent value="tkk_pramuka">
                        <TabTKKSiswa siswa={siswa} tandaKecakapanKhusus={tandaKecakapanKhusus} />
                    </TabsContent>
                    <TabsContent value="kartu_siswa">
                        {/* <TabTKKSiswa siswa={siswa} tandaKecakapanKhusus={tandaKecakapanKhusus} /> */}
                        <TabKartuSiswa siswa={siswa} kartu={kartu}/>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
