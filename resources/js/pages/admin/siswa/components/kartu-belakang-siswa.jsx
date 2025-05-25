import { Card } from '@/components/ui/card';

export default function KartuBelakangSiswa({ siswa, kartuBelakang }) {
    return (
        <Card
            className="w-full md:max-w-[600px]"
            style={{
                backgroundImage: kartuBelakang?.url ? `url(${kartuBelakang.url})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                aspectRatio: '85.60 / 53.98',
            }}
        >
            <div className="pt-24">
                <div className="flex w-full flex-col items-center justify-center p-4">
                    <div className="h-fit w-fit rounded-md bg-white p-1 md:p-2.5">
                        <img src={siswa?.qr_code_url ?? ''} alt={`QR Code ${siswa?.nama_lengkap}`} className="h-20 w-20 md:h-28 md:w-28" />
                    </div>
                    <p className="pt-1 text-xs italic">Scan to view</p>
                </div>
            </div>
        </Card>
    );
}
