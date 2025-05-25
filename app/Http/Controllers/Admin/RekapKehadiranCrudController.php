<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RekapKehadiranCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rekapKehadiranQuery = \App\Models\Siswa::query();

        if (request()->has('search') && request()->search != '') {
            $rekapKehadiranQuery->where('nama_lengkap', 'like', '%' . request()->search . '%');
        }

        if (request()->has('filter') && request()->filter != '') {
            $rekapKehadiranQuery->orWhereHas('kelas', function ($query) {
                $query->where('slug', 'like', '%' . request()->filter . '%');
            });
        }

        $rekapKehadiran = $rekapKehadiranQuery->with(['kehadiran', 'kelas:id,slug,nama_kelas', 'kelas.jadwalKehadiran'])->paginate(20);
        $jadwalPertemuan = \App\Models\JadwalKehadiran::with('kelas:id,nama_kelas,slug')->get();
        $rekapKehadiran->getCollection()->transform(function ($item) use ($jadwalPertemuan) {
            $item->jadwal_pertemuan = $jadwalPertemuan->where('kelas_id', $item->kelas_id)->values();
            return $item;
        });


        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas', 'slug']);

        return Inertia::render('admin/rekap-kehadiran/index', [
            'rekapKehadiran' => $rekapKehadiran,
            'kelas' => $kelas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rekapSiswa = \App\Models\Siswa::with(['kelas', 'kehadiran'])->findOrFail($id);
        $rekapSiswa->jadwal_pertemuan = $rekapSiswa->kelas->jadwalKehadiran;

        return Inertia::render('admin/rekap-kehadiran/show', [
            'rekapSiswa' => $rekapSiswa,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
