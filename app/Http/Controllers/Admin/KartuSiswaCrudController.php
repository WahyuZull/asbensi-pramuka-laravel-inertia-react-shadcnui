<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KartuSiswaCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kartuSiswa = \App\Models\KartuSiswa::all();
        foreach ($kartuSiswa as $item) {
            $item->url = $item->getFirstMediaUrl('cover-kartu-siswa');
        }
        $kartuSiswa = $kartuSiswa->map(function ($item) {
            return [
                'id' => $item->id,
                'cover' => $item->cover,
                'url' => $item->url,
            ];
        });
        return Inertia::render('admin/setting-kartu-siswa/index', [
            'kartuSiswa' => $kartuSiswa,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/setting-kartu-siswa/manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'cover' => 'required|in:depan,belakang',
            'gambar_cover' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ], [
            'cover.required' => 'Pilih cover kartu siswa',
            'cover.in' => 'Cover kartu siswa tidak valid',
            'gambar_cover.required' => 'Gambar cover kartu siswa tidak boleh kosong',
            'gambar_cover.image' => 'Gambar cover kartu siswa harus berupa gambar',
            'gambar_cover.mimes' => 'Gambar cover kartu siswa harus berupa file dengan ekstensi jpeg, png, jpg',
            'gambar_cover.max' => 'Ukuran gambar cover kartu siswa maksimal 2MB',
        ]);

        $kartuSiswa = \App\Models\KartuSiswa::create([
            'cover' => $request->cover,
        ]);

        $extension = $request->file('gambar_cover')->getClientOriginalExtension();
        $filename = 'kartu-siswa-' . $request->cover . '.' . $extension;

        $kartuSiswa->addMedia($request->gambar_cover)->usingFileName($filename)->toMediaCollection('cover-kartu-siswa');

        session()->flash('success', 'Berhasil menyimpan pengaturan kartu siswa');
        return redirect()->route('dashboard.setting-kartu-siswa.index');
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
        $kartuSiswa = \App\Models\KartuSiswa::findOrFail($id);
        $kartuSiswa->clearMediaCollection('cover-kartu-siswa');
        $kartuSiswa->delete();

        session()->flash('success', 'Berhasil menghapus pengaturan kartu siswa');
        return redirect()->route('dashboard.setting-kartu-siswa.index');
    }
}
