<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TKKCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tkkQuery = \App\Models\TandaKecakapanKhusus::query();
        $tkkQuery->when(request('search'), function ($query, $search) {
            return $query->where('nama', 'like', '%' . $search . '%')->orWhere('slug', 'like', '%' . $search . '%');
        });

        $tandaKecakapanKhusus = $tkkQuery->paginate(20);
        return Inertia::render('admin/tanda-kecakapan-khusus/index', [
            'tandaKecakapanKhusus' => $tandaKecakapanKhusus
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/tanda-kecakapan-khusus/manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ], [
            'nama.required' => 'Nama wajib diisi',
            'nama.string' => 'Nama harus berupa teks',
            'nama.max' => 'Nama tidak boleh lebih dari 255 karakter',
            'slug.required' => 'Slug wajib diisi',
            'slug.string' => 'Slug harus berupa teks',
            'slug.max' => 'Slug tidak boleh lebih dari 255 karakter',
        ]);

        \App\Models\TandaKecakapanKhusus::create($request->all());

        session()->flash('success', 'Tanda Kecakapan Khusus berhasil ditambahkan');
        return redirect()->route('dashboard.tanda-kecakapan-khusus.index');
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
        $tandaKecakapanKhusus = \App\Models\TandaKecakapanKhusus::findOrFail($id);
        return Inertia::render('admin/tanda-kecakapan-khusus/manage', [
            'tandaKecakapanKhusus' => $tandaKecakapanKhusus,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ], [
            'nama.required' => 'Nama tkk wajib diisi',
            'nama.string' => 'Nama tkk harus berupa teks',
            'nama.max' => 'Nama tidak boleh lebih dari 255 karakter',
            'slug.required' => 'Slug wajib diisi',
            'slug.string' => 'Slug harus berupa teks',
            'slug.max' => 'Slug tidak boleh lebih dari 255 karakter',
        ]);

        $tkk = \App\Models\TandaKecakapanKhusus::findOrFail($id);
        $tkk->update($request->all());

        session()->flash('success', 'Tanda kecakapan khusus berhasil diperbarui');
        return redirect()->route('dashboard.tanda-kecakapan-khusus.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tkk = \App\Models\TandaKecakapanKhusus::findOrFail($id);
        $tkk->delete();

        session()->flash('success', 'Tanda kecakapan khusus berhasil dihapus');
        return redirect()->route('dashboard.tanda-kecakapan-khusus.index');
    }
}
