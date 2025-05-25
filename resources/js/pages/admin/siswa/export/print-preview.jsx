import { Head } from '@inertiajs/react';
import KartuBelakangSiswa from '../components/kartu-belakang-siswa';
import KartuDepanSiswa from '../components/kartu-depan-siswa';

export default function PrintPreview({ siswa }) {
    return (
        <>
            <Head title={`Print Preview Kartu Siswa ${siswa.nama_lengkap}`} />
            <div className="flex items-center justify-center space-x-6 py-4">
                {/* Kartu Bagian Depan */}
                <KartuDepanSiswa siswa={siswa} />

                {/* Kartu Bagian Belakang */}
                <KartuBelakangSiswa siswa={siswa} />
            </div>
        </>
    );
}
