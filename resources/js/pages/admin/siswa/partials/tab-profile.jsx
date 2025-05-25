import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TabProfile({ siswa }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Siswa</CardTitle>
                <CardDescription>Berikut adalah profil siswa.</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <div className="grid w-full max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">NIS</p>
                            <p className="text-muted-foreground text-sm">{siswa?.nis ?? '-'}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">Nama Lengkap</p>
                            <p className="text-muted-foreground text-sm">{siswa?.nama_lengkap}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">Tempat, Tanggal Lahir</p>
                            <p className="text-muted-foreground text-sm">{`${(siswa?.tempat_lahir, siswa?.tanggal_lahir ?? '-')}`}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">Alamat</p>
                            <p className="text-muted-foreground text-sm">{siswa?.alamat ?? '-'}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">Jenis Kelamin</p>
                            <p className="text-muted-foreground text-sm">{siswa?.jenis_kelamin ?? '-'}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">Kelas</p>
                            <p className="text-muted-foreground text-sm">{siswa?.kelas?.nama_kelas ?? '-'}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">Golongan Pramuka</p>
                            <p className="text-muted-foreground text-sm">{siswa?.golongan_pramuka?.nama_golongan ?? '-'}</p>
                        </div>
                    </div>
                    <div className="flex-1 md:max-w-2xl">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">QR Code</p>

                            <div className="size-48">
                                <img
                                    src={siswa?.qr_code_url ?? ''}
                                    className="size-full overflow-hidden object-center"
                                    alt={`QR Code ${siswa?.nama_lengkap}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
