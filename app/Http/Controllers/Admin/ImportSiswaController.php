<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\SiswaImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportSiswaController extends Controller
{
    public function index()
    {
        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas']);
        $golonganPramuka = \App\Models\GolonganPramuka::get(['id', 'nama_golongan']);
        return Inertia::render('admin/siswa/import/index', [
            'kelas' => $kelas,
            'golonganPramuka' => $golonganPramuka,
        ]);
    }

    public function upload()
    {

        $validated = request()->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);

        Excel::import(new SiswaImport(), $validated['file']);
        session()->flash('success', 'Berhasil impor data siswa');
        return redirect()->route('dashboard.import.siswa.index');
    }

    public function downloadTemplate()
    {
        session()->flash('success', 'Berhasil download template');
        return response()->download(storage_path('app/public/template/template_import_siswa.xlsx'));
    }
}
