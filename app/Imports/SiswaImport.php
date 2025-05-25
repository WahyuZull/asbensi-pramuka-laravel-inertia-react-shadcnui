<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class SiswaImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        // dd($rows);
        foreach ($rows as $row) {
            $siswa = \App\Models\Siswa::create([
                'nama_lengkap' => $row['nama_lengkap'],
                'nis' => $row['nis'] ?? null,
                'jenis_kelamin' => $row['jenis_kelamin'],
                'tempat_lahir' => $row['tempat_lahir'] ?? null,
                'tanggal_lahir' => isset($row['tanggal_lahir']) ? date('Y-m-d', strtotime($row['tanggal_lahir'])) : null,
                'alamat' => $row['alamat'] ?? null,
                'kelas_id' => $row['kelas_id'],
                'golongan_pramuka_id' => $row['golongan_pramuka_id'],
                'user_id' => $row['user_id'] ?? null,
            ]);

            // Prepare data untuk QR Code dalam format JSON
            $qrData = [
                'id' => $siswa->id,
                'nama_lengkap' => $siswa->nama_lengkap,
                'nis' => $siswa->nis,
                'jenis_kelamin' => $siswa->jenis_kelamin,
                'tempat_lahir' => $siswa->tempat_lahir,
                'tanggal_lahir' => $siswa->tanggal_lahir,
                'alamat' => $siswa->alamat,
            ];

            $qr_code_content = json_encode($qrData);

            // Generate QR Code

            $qr_code_image = QrCode::format('svg')
                ->size(300)
                ->generate($qr_code_content);

            $qr_code_filename = Str::slug('qr-code-' . $siswa->nama_lengkap, '-') . '-' . time() . '.svg';
            $qr_code_path = 'uploads/qr-code-siswa/' . $qr_code_filename;

            // Simpan QR Code ke storage
            $qr_code_path = 'uploads/qr-code-siswa/' . $qr_code_filename;

            Storage::disk('public')->put($qr_code_path, $qr_code_image);

            // Update Siswa dengan QR code info
            $siswa->update([
                'qr_code_image' => $qr_code_filename,
                'qr_code_url' => Storage::url($qr_code_path),
            ]);
        }
    }
}
