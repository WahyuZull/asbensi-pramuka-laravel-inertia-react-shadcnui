import { FormComboBox } from '@/components/form-combobox';
import DatePicker from '@/components/form-date-picker';
import { FormField } from '@/components/form-field';
import { FormSelector } from '@/components/form-selector';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { GENDER_OPTIONS } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
export default function SiswaForm({ kelas, golonganPramuka, siswa, tandaKecakapanKhusus }) {
    const {
        data,
        setData,
        post,
        put: update,
        processing,
        errors,
    } = useForm({
        nis: siswa?.nis ?? '',
        nama_lengkap: siswa?.nama_lengkap ?? '',
        jenis_kelamin: siswa?.jenis_kelamin ?? '',
        tempat_lahir: siswa?.tempat_lahir ?? '',
        tanggal_lahir: siswa?.tanggal_lahir ?? '',
        alamat: siswa?.alamat ?? '',

        kelas_id: siswa?.kelas_id ?? '',
        golongan_pramuka_id: siswa?.golongan_pramuka_id ?? '',
        tanda_kecakapan_khusus: siswa?.tkkIds ?? [],
    });

    const kelasOptions = kelas?.map((kls) => ({
        value: String(kls.id),
        label: kls.nama_kelas,
    }));

    const golonganOptions = golonganPramuka?.map((gol) => ({
        value: String(gol.id),
        label: gol.nama_golongan,
    }));

    const tandaKecakapanKhususOptions = tandaKecakapanKhusus?.map((tkk) => ({
        value: String(tkk.id),
        label: tkk.nama,
    }));

    const handleSelectTkk = (selectedTkk) => {
        const siswaTkk = [...data.tanda_kecakapan_khusus];
        if (siswaTkk.includes(selectedTkk)) {
            setData(
                'tanda_kecakapan_khusus',
                siswaTkk.filter((tkk) => tkk !== selectedTkk),
            );
        } else {
            setData('tanda_kecakapan_khusus', [...siswaTkk, selectedTkk]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (siswa) {
            update(route('dashboard.siswa.update', siswa.id));
        } else {
            post(route('dashboard.siswa.store'));
        }
    };

    return (
        <>
            <CardContent>
                <form>
                    <div className="block space-y-6 md:flex md:gap-6">
                        <div className="w-full space-y-6">
                            <FormField
                                label="NIS"
                                id="nis"
                                type="text"
                                inputMode="numeric"
                                value={data?.nis}
                                onChange={(e) => setData('nis', e.target.value)}
                                error={errors.nis}
                                placeholder="Masukkan NIS"
                            />
                            <FormField
                                label="Nama Siswa"
                                id="nama_lengkap"
                                type="text"
                                value={data?.nama_lengkap}
                                onChange={(e) => setData('nama_lengkap', e.target.value)}
                                error={errors.nama_lengkap}
                                placeholder="Masukkan Nama Siswa"
                            />
                            <FormSelector
                                label="Jenis Kelamin"
                                id="jenis_kelamin"
                                value={data?.jenis_kelamin}
                                options={GENDER_OPTIONS}
                                onChange={(value) => setData('jenis_kelamin', value)}
                                error={errors.jenis_kelamin}
                                placeholder="Pilih jenis kelamin"
                            />
                        </div>
                        <div className="w-full space-y-6">
                            <FormField
                                label="Tempat Lahir"
                                id="tempat_lahir"
                                type="text"
                                value={data?.tempat_lahir}
                                onChange={(e) => setData('tempat_lahir', e.target.value)}
                                error={errors.tempat_lahir}
                                placeholder="Masukkan Tempat Lahir"
                            />

                            <DatePicker
                                label="Tanggal Lahir"
                                id="tanggal_lahir"
                                date={data?.tanggal_lahir}
                                onSelect={(date) => setData('tanggal_lahir', date)}
                                error={errors.tanggal_lahir}
                                placeholder="Pilih Tanggal Lahir"
                            />

                            <FormField
                                label="Alamat"
                                id="alamat"
                                type="textarea"
                                value={data?.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                error={errors.alamat}
                                placeholder="Masukkan Alamat"
                            />
                        </div>
                        <div className="w-full space-y-6">
                            <FormSelector
                                label="Kelas"
                                id="kelas_id"
                                value={kelasOptions.find((opt) => opt.value === data?.kelas_id)}
                                options={kelasOptions}
                                onChange={(value) => setData('kelas_id', parseInt(value))}
                                error={errors.kelas_id}
                                placeholder="Pilih Kelas"
                            />
                            <FormSelector
                                label="Golongan Pramuka"
                                id="golongan_pramuka_id"
                                value={golonganOptions.find((opt) => opt.value === data?.golongan_pramuka_id)}
                                options={golonganOptions}
                                onChange={(value) => setData('golongan_pramuka_id', parseInt(value))}
                                error={errors.golongan_pramuka_id}
                                placeholder="Pilih Golongan Pramuka"
                            />
                            <FormComboBox
                                label="Tanda Kecakapan Khusus"
                                id="tanda_kecakapan_khusus"
                                placeholder="Pilih TKK"
                                options={tandaKecakapanKhususOptions}
                                selectedOption={data?.tanda_kecakapan_khusus}
                                onSelect={handleSelectTkk}
                                error={errors?.tanda_kecakapan_khusus}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={processing} onClick={handleSubmit}>
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </CardFooter>
        </>
    );
}
