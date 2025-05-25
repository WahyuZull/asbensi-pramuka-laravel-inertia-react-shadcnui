<?php

namespace App\Exports;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class SiswaExport implements FromQuery, ShouldAutoSize, WithHeadings, WithDrawings
{
    use Exportable;

    protected $kelas_id;
    protected $golongan_pramuka_id;

    public function __construct($kelas_id, $golongan_pramuka_id)
    {
        $this->kelas_id = $kelas_id;
        $this->golongan_pramuka_id = $golongan_pramuka_id;
    }

    public function query()
    {
        return Siswa::query()
            ->when($this->kelas_id, function($query) {
                return $query->where('kelas_id', $this->kelas_id);
            })
            ->when($this->golongan_pramuka_id, function($query) {
                return $query->where('golongan_pramuka_id', $this->golongan_pramuka_id);
            })
            ->select([
                'id',
                'nis', 
                'nama_lengkap',
                'jenis_kelamin',
                'tempat_lahir',
                'tanggal_lahir',
                'alamat',
                'qr_code_url',
                'qr_code_image',
                'kelas_id',
                'golongan_pramuka_id',
            ]);
    }

    public function headings(): array
    {
        return [
            'ID',
            'NIS',
            'Nama Lengkap',
            'Jenis Kelamin',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Alamat',
            'QR Code Url',
            'QR Code Image',
            'Kelas ID',
            'Golongan Pramuka ID',
        ];
    }

    public function drawings()
    {
        $drawings = [];
        $siswa = $this->query()->get();
        
        foreach ($siswa as $index => $data) {
            if ($data->qr_code_image) {
                $drawing = new Drawing();
                $drawing->setName('QR Code');
                $drawing->setDescription('QR Code');
                $drawing->setPath(public_path($data->qr_code_url));
                $drawing->setHeight(50);
                $drawing->setCoordinates('I' . ($index + 2));
                $drawings[] = $drawing;
            }
        }

        return $drawings;
    }
}
