<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalKehadiranCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jadwalQuery = \App\Models\JadwalKehadiran::query();
        
        if (request()->has('search') && request()->search != '') {
            $jadwalQuery->where('hari', 'like', '%' . request()->search . '%');
        }

        if (request()->has('filter') && request()->filter != '') {
            $jadwalQuery->orWhereHas('kelas', function ($query) {
                $query->where('slug', 'like', '%' . request()->filter . '%');
            });
        }

        $jadwalKehadiran = $jadwalQuery->with('kelas')->orderBy('created_at', 'DESC')->paginate(20);
        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas', 'slug']);
        return Inertia::render('admin/jadwal-kehadiran/index', [
            'jadwalKehadiran' => $jadwalKehadiran,
            'kelas' => $kelas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/jadwal-kehadiran/manage', [
            'kelas' => \App\Models\Kelas::get(['id', 'nama_kelas']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hari' => 'required|string|max:255',
            'tanggal' => 'required|date_format:Y-m-d',
            'mulai_absen' => 'required|date_format:H:i',
            'selesai_absen' => 'required|date_format:H:i',
            'kelas_id' => 'required|exists:kelas,id',
        ], [
            'hari.required' => 'Hari harus diisi.',
            'hari.string' => 'Hari harus berupa string.',
            'hari.max' => 'Hari tidak boleh lebih dari 255 karakter.',
            'tanggal.required' => 'Tanggal harus diisi.',
            'tanggal.date_format' => 'Format tanggal tidak valid.',
            'mulai_absen.required' => 'Mulai absen harus diisi.',
            'mulai_absen.date_format' => 'Format mulai absen tidak valid.',
            'selesai_absen.required' => 'Selesai absen harus diisi.',
            'selesai_absen.date_format' => 'Format selesai absen tidak valid.',
            'kelas_id.required' => 'Kelas harus diisi.',
            'kelas_id.exists' => 'Kelas tidak ditemukan.',
        ]);

        \App\Models\JadwalKehadiran::create($validated);

        session()->flash('success', 'Berhasil menambahkan jadwal kehadiran');
        return redirect()->route('dashboard.jadwal-kehadiran.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $jadwalKehadiran = \App\Models\JadwalKehadiran::findOrFail($id);
        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas']);
        return Inertia::render('admin/jadwal-kehadiran/manage', [
            'jadwalKehadiran' => $jadwalKehadiran,
            'kelas' => $kelas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'hari' => 'string|max:255',
            'tanggal' => 'date_format:Y-m-d',
            'mulai_absen' => 'date_format:H:i',
            'selesai_absen' => 'date_format:H:i',
            'kelas_id' => 'exists:kelas,id',
        ], [
            'hari.string' => 'Hari harus berupa string.',
            'hari.max' => 'Hari tidak boleh lebih dari 255 karakter.',
            'tanggal.date_format' => 'Format tanggal tidak valid.',
            'mulai_absen.date_format' => 'Format mulai absen tidak valid.',
            'selesai_absen.date_format' => 'Format selesai absen tidak valid.',
            'kelas_id.exists' => 'Kelas tidak ditemukan.',
        ]);

        $jadwalKehadiran = \App\Models\JadwalKehadiran::findOrFail($id);

        $jadwalKehadiran->update($validated);

        session()->flash('success', 'Berhasil mengupdate jadwal kehadiran');
        return redirect()->route('dashboard.jadwal-kehadiran.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jadwalKehadiran = \App\Models\JadwalKehadiran::find($id);
        if (!$jadwalKehadiran) {
            session()->flash('error', 'Jadwal kehadiran tidak ditemukan');
        }

        $jadwalKehadiran->delete();

        session()->flash('success', 'Berhasil menghapus jadwal kehadiran');
        return redirect()->route('dashboard.jadwal-kehadiran.index');
    }
}
