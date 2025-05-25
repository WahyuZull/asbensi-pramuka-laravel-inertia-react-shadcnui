<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GolonganPramukaCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $golonganQuery = \App\Models\GolonganPramuka::query();
        $golonganQuery->when(request('search'), function ($query, $search) {
            return $query->where('nama_golongan', 'like', '%' . $search . '%');
        });

        $golongans = $golonganQuery->paginate(20);
        return Inertia::render('admin/golongan-pramuka/index', [
            'golongans' => $golongans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/golongan-pramuka/manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_golongan' => 'required|string|max:50',
            'slug' => 'required|string|max:50',
        ], [
            'nama_golongan.required' => 'Nama golongan wajib diisi',
            'nama_golongan.string' => 'Nama golongan harus berupa string',
            'nama_golongan.max' => 'Nama golongan maksimal 50 karakter',
            'slug.required' => 'Slug wajib diisi',
            'slug.string' => 'Slug harus berupa string',
            'slug.max' => 'Slug maksimal 50 karakter',
        ]);

        \App\Models\GolonganPramuka::create([
            'nama_golongan' => $request->nama_golongan,
            'slug' => $request->slug,
        ]);

        session()->flash('success', 'Golongan pramuka berhasil ditambahkan');
        return redirect()->route('dashboard.golongan-pramuka.index');
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
        $golongan = \App\Models\GolonganPramuka::findOrFail($id);
        return Inertia::render('admin/golongan-pramuka/manage', [
            'golongan' => $golongan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $golongan = \App\Models\GolonganPramuka::findOrFail($id);
        $request->validate([
            'nama_golongan' => 'string|max:50',
            'slug' => 'string|max:50',
        ], [
            'nama_golongan.string' => 'Nama golongan harus berupa string',
            'nama_golongan.max' => 'Nama golongan maksimal 50 karakter',
            'slug.string' => 'Slug harus berupa string',
            'slug.max' => 'Slug maksimal 50 karakter',
        ]);

        $golongan->update([
            'nama_golongan' => $request->nama_golongan,
            'slug' => $request->slug,
        ]);

        session()->flash('success', 'Golongan pramuka berhasil diubah');
        return redirect()->route('dashboard.golongan-pramuka.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $golongan = \App\Models\GolonganPramuka::findOrFail($id);
        $golongan->delete();

        session()->flash('success', 'Golongan pramuka berhasil dihapus');
        return redirect()->route('dashboard.golongan-pramuka.index');
    }
}
