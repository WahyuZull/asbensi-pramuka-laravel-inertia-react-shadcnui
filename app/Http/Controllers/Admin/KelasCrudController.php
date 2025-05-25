<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kelasQuery = \App\Models\Kelas::query();
        $kelasQuery->when(request('search'), function ($query, $search) {
            return $query->where('slug', 'like', '%' . $search . '%');
        });

        $kelas = $kelasQuery->paginate(20);
        return Inertia::render('admin/kelas/index', [
            'kelas' => $kelas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/kelas/manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_kelas' => 'required|string|max:5',
            'slug' => 'required|string|max:5'
        ], [
            'nama_kelas.required' => 'Nama Kelas wajib diisi',
            'nama_kelas.string' => 'Nama Kelas harus berupa teks',
            'nama_kelas.max' => 'Nama Kelas tidak boleh lebih dari 5 karakter',
            'slug.required' => 'Slug wajib diisi',
            'slug.string' => 'Slug harus berupa teks',
            'slug.max' => 'Slug tidak boleh lebih dari 5 karakter'
        ]);

        \App\Models\Kelas::create($request->all());

        session()->flash('success', 'Kelas berhasil dibuat');
        return redirect()->route('dashboard.kelas.index');
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
        $kelas = \App\Models\Kelas::findOrFail($id);
        return Inertia::render('admin/kelas/manage', [
            'kelas' => $kelas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nama_kelas' => 'string|max:5',
            'slug' => 'string|max:5'
        ], [
            'nama_kelas.string' => 'Nama Kelas harus berupa teks',
            'nama_kelas.max' => 'Nama Kelas tidak boleh lebih dari 5 karakter',
            'slug.string' => 'Slug harus berupa teks',
            'slug.max' => 'Slug tidak boleh lebih dari 5 karakter'
        ]);

        $kelas = \App\Models\Kelas::findOrFail($id);
        $kelas->update($request->all());

        session()->flash('success', 'Kelas berhasil diperbarui');
        return redirect()->route('dashboard.kelas.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kelas = \App\Models\Kelas::findOrFail($id);
        $kelas->delete();

        session()->flash('success', 'Kelas berhasil dihapus');
        return redirect()->route('dashboard.kelas.index');
    }
}
