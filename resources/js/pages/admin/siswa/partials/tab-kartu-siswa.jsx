import HeadingSmall from '@/components/heading-small';
import KartuBelakangSiswa from '../components/kartu-belakang-siswa';
import KartuDepanSiswa from '../components/kartu-depan-siswa';

export default function TabKartuSiswa({ siswa, kartu }) {
    const kartuDepan = kartu?.find(k => k.cover === 'depan');
    const kartuBelakang = kartu?.find(k => k.cover === 'belakang');
    return (
        <div className="space-y-6">
            {/* Kartu Bagian Depan */}
            <HeadingSmall title="Kartu Siswa Tampak Depan" description="Berikut adalah kartu siswa tampak depan." />
            <KartuDepanSiswa siswa={siswa} kartuDepan={kartuDepan} />

            {/* Kartu Bagian Belakang */}
            <HeadingSmall title="Kartu Siswa Tampak Belakang" description="Berikut adalah kartu siswa tampak belakang." />
            <KartuBelakangSiswa siswa={siswa} kartuBelakang={kartuBelakang}/>
        </div>
    );
}
