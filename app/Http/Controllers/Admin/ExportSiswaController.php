<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SiswaExport;
use App\Http\Controllers\Controller;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

use Maatwebsite\Excel\Facades\Excel;

class ExportSiswaController extends Controller
{
    public function index()
    {
        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas']);
        $golonganPramuka = \App\Models\GolonganPramuka::get(['id', 'nama_golongan']);
        return Inertia::render('admin/siswa/export/index', [
            'kelas' => $kelas,
            'golonganPramuka' => $golonganPramuka,
        ]);
    }

    public function download(Request $request)
    {
        $request->validate([
            'kelas_id' => 'nullable|exists:kelas,id',
            'golongan_pramuka_id' => 'nullable|exists:golongan_pramukas,id',
        ], [
            'kelas_id.exists' => 'Kelas tidak valid',
            'golongan_pramuka_id.exists' => 'Golongan pramuka tidak valid',
        ]);

        $filename = 'data-siswa';
        if ($request->kelas_id) {
            $kelas = \App\Models\Kelas::find($request->kelas_id);
            $filename .= '-kelas-' . str_replace(' ', '-', strtolower($kelas->nama_kelas));
        }
        if ($request->golongan_pramuka_id) {
            $golonganPramuka = \App\Models\GolonganPramuka::find($request->golongan_pramuka_id);
            $filename .= '-golongan-' . str_replace(' ', '-', strtolower($golonganPramuka->nama_golongan));
        }

        $filename .= '.xlsx';

        return Excel::download(new SiswaExport(
            $request->query('kelas_id'),
            $request->query('golongan_pramuka_id')
        ), $filename, \Maatwebsite\Excel\Excel::XLSX);
    }

    public function print(string $siswaId)
    {
        $siswa = \App\Models\Siswa::findOrFail($siswaId);
        if (!$siswa) {
            session()->flash('error', 'Siswa tidak ditemukan');
            return redirect()->back();
        }
        $pdf = Pdf::loadView('kartu-siswa/kartu-siswa-single', [
            'siswa' => $siswa,
        ]);
        $pdf->setPaper('A4', 'portrait');
        return $pdf->stream('data-siswa-' . str_replace(' ', '-', strtolower($siswa->nama_lengkap)) . '.pdf');
    }

    public function bulkPrint(Request $request)
    {
        $request->validate([
            'siswa_ids' => 'required|array',
            'siswa_ids.*' => 'exists:siswas,id',
        ], [
            'siswa_ids.required' => 'Pilih minimal 1 siswa',
            'siswa_ids.array' => 'Siswa tidak valid',
            'siswa_ids.*.exists' => 'Siswa tidak valid',
        ]);

        $siswas = Siswa::whereIn('id', $request->siswa_ids)->orderBy('nama_lengkap')->get();

        if ($siswas->isEmpty()) {
            return redirect()->back()->with('error', 'Siswa tidak ditemukan');
        }

        // Gunakan satu view dan kirim semua siswa
        $pdf = Pdf::loadView('kartu-siswa.kartu-siswa-duplex', [
            'siswas' => $siswas,
        ]);
        $pdf->setPaper('A4', 'portrait');

        return $pdf->stream(date('Y-m-d') . '-' . 'kartu-siswa-cetak-duplex.pdf');
    }
}
