import { Card } from '@/components/ui/card';

export default function KartuDepanSiswa({ siswa, kartuDepan }) {
    return (
        <Card
            className="w-full md:max-w-[600px]"
            style={{
                backgroundImage: kartuDepan?.url ? `url(${kartuDepan.url})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                aspectRatio: '85.60 / 53.98',
            }}
        >
            <div className="relative h-full p-4">
                <div className="absolute bottom-10 w-full md:bottom-14">
                    <div className="flex gap-4">
                        {/* <div className="h-fit w-fit rounded-md bg-white p-1 md:p-2.5">
                                <img src={siswa?.qr_code_url ?? ''} alt="Foto Siswa" className="h-20 w-20 md:h-28 md:w-28" />
                            </div> */}
                        <table className="w-[70%]">
                            <tbody className="text-xs md:text-lg">
                                <tr>
                                    <td className="w-1/3 align-top font-bold">NIS</td>
                                    <td className="w-[30px] align-top font-bold">:</td>
                                    <td className="text-muted-foreground align-top">{siswa?.nis ?? '-'}</td>
                                </tr>
                                <tr>
                                    <td className="align-top font-bold">Nama Lengkap</td>
                                    <td className="align-top font-bold">:</td>
                                    <td className="text-muted-foreground align-top">{siswa?.nama_lengkap}</td>
                                </tr>
                                <tr>
                                    <td className="align-top font-bold">Jenis Kelamin</td>
                                    <td className="align-top font-bold">:</td>
                                    <td className="text-muted-foreground align-top">{siswa?.jenis_kelamin ?? '-'}</td>
                                </tr>
                                <tr>
                                    <td className="align-top font-bold">Tempat, Tanggal Lahir</td>
                                    <td className="align-top font-bold">:</td>
                                    <td className="text-muted-foreground align-top text-wrap">
                                        {siswa?.tempat_lahir ? `${siswa.tempat_lahir}, ${siswa.tanggal_lahir}` : '-'}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-top font-bold">Alamat</td>
                                    <td className="align-top font-bold">:</td>
                                    <td className="text-muted-foreground align-top">{siswa?.alamat ?? '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Card>
    );
}
