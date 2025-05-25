<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KehadiranSiswaCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kehadiranQuery = \App\Models\Kehadiran::query();
        $kehadiranQuery->when(request()->has('search'), function ($query) {
            $query->where('tanggal', 'like', '%' . request()->search . '%')
                ->orWhereHas('siswa', function ($query) {
                    $query->where('nama_lengkap', 'like', '%' . request()->search . '%');
                })
                ->orWhereHas('kelas', function ($query) {
                    $query->where('slug', 'like', '%' . request()->search . '%');
                });
        });

        $kehadiran = $kehadiranQuery->with(['siswa.kelas', 'siswa.golonganPramuka', 'kelas'])->orderBy('tanggal', 'desc')->paginate(20);

        return Inertia::render('admin/kehadiran/index', [
            'kehadiran' => $kehadiran
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $siswa = \App\Models\Siswa::select('id', 'nama_lengkap')->get();
        return Inertia::render('admin/kehadiran/manage', ['siswa' => $siswa]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswas,id',
            'status' => 'required|in:hadir,sakit,izin,alpa',
            'keterangan' => 'nullable|string|max:255',
        ], [
            'siswa_id.required' => 'Siswa harus dipilih.',
            'siswa_id.exists' => 'Siswa tidak ditemukan.',
            'status.required' => 'Pilih salah satu status kehadiran.',
            'status.in' => 'Status kehadiran tidak valid.',
            'keterangan.string' => 'Keterangan harus berupa string.',
            'keterangan.max' => 'Keterangan tidak boleh lebih dari 255 karakter.',
        ]);

        $jadwalHariIni = \App\Models\JadwalKehadiran::where('kelas_id', \App\Models\Siswa::find($validated['siswa_id'])->kelas_id)
            ->whereDate('tanggal', now()->format('Y-m-d'))
            ->first();

        if (!$jadwalHariIni) {
            session()->flash('error', 'Tidak ada jadwal untuk hari ini.');
            return redirect()->back();
        }

        $kehadiranHariIni = \App\Models\Kehadiran::where('siswa_id', $validated['siswa_id'])
            ->whereDate('tanggal', now()->format('Y-m-d'))
            ->first();

        if ($kehadiranHariIni) {
            session()->flash('error', 'Siswa sudah absen hari ini.');
            return redirect()->back();
        }

        $validated['tanggal'] = now()->locale('id');
        $validated['kelas_id'] = \App\Models\Siswa::find($validated['siswa_id'])->kelas_id;

        \App\Models\Kehadiran::create([
            'tanggal' => $validated['tanggal'],
            'siswa_id' => $validated['siswa_id'],
            'kelas_id' => $validated['kelas_id'],
            'status' => $validated['status'],
            'keterangan' => $validated['keterangan'],
        ]);

        session()->flash('success', 'Kehadiran siswa berhasil ditambahkan.');
        return redirect()->route('dashboard.kehadiran.index');
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
        $kehadiran = \App\Models\Kehadiran::with(['siswa.kelas', 'siswa.golonganPramuka', 'kelas'])->findOrFail($id);
        $siswa = \App\Models\Siswa::select('id', 'nama_lengkap')->get();
        return Inertia::render('admin/kehadiran/manage', [
            'kehadiran' => $kehadiran,
            'siswa' => $siswa
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'siswa_id' => 'exists:siswas,id',
            'status' => 'in:hadir,sakit,izin,alpa',
            'keterangan' => 'nullable|string|max:255',
        ], [
            'siswa_id.exists' => 'Siswa tidak ditemukan.',
            'status.in' => 'Status kehadiran tidak valid.',
            'keterangan.string' => 'Keterangan harus berupa string.',
            'keterangan.max' => 'Keterangan tidak boleh lebih dari 255 karakter.',
        ]);

        $kehadiran = \App\Models\Kehadiran::findOrFail($id);
        $kehadiran->update([
            'siswa_id' => $validated['siswa_id'] ?? $kehadiran->siswa_id,
            'status' => $validated['status'] ?? $kehadiran->status,
            'keterangan' => $validated['keterangan'] ?? $kehadiran->keterangan,
            'kelas_id' => \App\Models\Siswa::find($validated['siswa_id'])->kelas_id ?? $kehadiran->kelas_id,
        ]);

        session()->flash('success', 'Kehadiran siswa berhasil diperbarui.');
        return redirect()->route('dashboard.kehadiran.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kehadiran = \App\Models\Kehadiran::findOrFail($id);
        $kehadiran->delete();

        session()->flash('success', 'Kehadiran siswa berhasil dihapus.');
        return redirect()->route('dashboard.kehadiran.index');
    }
}
