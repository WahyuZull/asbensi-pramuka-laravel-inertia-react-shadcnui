<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class SiswaCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $siswaQuery = \App\Models\Siswa::query();

        if (request()->has('search') && request()->search != '') {
            $siswaQuery->where('nama_lengkap', 'like', '%' . request()->search . '%');
        }

        if (request()->has('filter') && request()->filter != '') {
            $siswaQuery->orWhereHas('kelas', function ($query) {
                $query->where('slug', 'like', '%' . request()->filter . '%');
            });
        }

        $siswas = $siswaQuery->with(['kelas', 'golonganPramuka'])->paginate(20);
        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas', 'slug']);

        return Inertia::render('admin/siswa/index', [
            'siswas' => $siswas,
            'kelas' => $kelas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas']);
        $golonganPramuka = \App\Models\GolonganPramuka::get(['id', 'nama_golongan']);
        $tkk = \App\Models\TandaKecakapanKhusus::get(['id', 'nama']);

        return Inertia::render('admin/siswa/manage', [
            'kelas' => $kelas,
            'golonganPramuka' => $golonganPramuka,
            'tandaKecakapanKhusus' => $tkk
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nis' => 'nullable|string|max:255',
            'jenis_kelamin' => 'required|string',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string|max:255',
            'kelas_id' => 'required|exists:kelas,id',
            'golongan_pramuka_id' => 'required|exists:golongan_pramukas,id',
            'tanda_kecakapan_khusus' => 'array',
            'tanda_kecakapan_khusus.*' => 'exists:tanda_kecakapan_khususes,id',
            'user_id' => 'nullable|exists:users,id',
        ], [
            'nama_lengkap.required' => 'Nama lengkap harus diisi',
            'nama_lengkap.string' => 'Nama lengkap harus berupa string',
            'nama_lengkap.max' => 'Nama lengkap maksimal 255 karakter',
            'nis.string' => 'NIS harus berupa string',
            'nis.max' => 'NIS maksimal 255 karakter',
            'jenis_kelamin.required' => 'Jenis kelamin harus diisi',
            'jenis_kelamin.string' => 'Jenis kelamin harus berupa string',
            'tempat_lahir.string' => 'Tempat lahir harus berupa string',
            'tempat_lahir.max' => 'Tempat lahir maksimal 255 karakter',
            'tanggal_lahir.date' => 'Format tanggal lahir salah',
            'alamat.string' => 'Alamat harus berupa string',
            'alamat.max' => 'Alamat maksimal 255 karakter',
            'kelas_id.required' => 'Kelas harus diisi',
            'kelas_id.exists' => 'Kelas tidak valid',
            'golongan_pramuka_id.required' => 'Golongan pramuka harus diisi',
            'golongan_pramuka_id.exists' => 'Golongan pramuka tidak valid',
            'tanda_kecakapan_khusus.array' => 'Tanda kecakapan khusus harus berupa array',
            'tanda_kecakapan_khusus.*' => 'Tanda kecakapan khusus tidak valid',
            'user_id.exists' => 'User tidak valid',
        ]);

        // Create Siswa
        $siswa = \App\Models\Siswa::create([
            'nama_lengkap' => $validated['nama_lengkap'],
            'nis' => $validated['nis'] ?? null,
            'jenis_kelamin' => $validated['jenis_kelamin'],
            'tempat_lahir' => $validated['tempat_lahir'] ?? null,
            'tanggal_lahir' => isset($validated['tanggal_lahir']) ? date('Y-m-d', strtotime($validated['tanggal_lahir'])) : null,
            'alamat' => $validated['alamat'] ?? null,
            'kelas_id' => $validated['kelas_id'],
            'golongan_pramuka_id' => $validated['golongan_pramuka_id'],
            'user_id' => $validated['user_id'] ?? null,
        ]);

        if (isset($validated['tanda_kecakapan_khusus'])) {
            $siswa->tandaKecakapanKhusus()->sync($validated['tanda_kecakapan_khusus']);
        }

        // Prepare data untuk QR Code dalam format JSON
        $qrData = [
            'id' => $siswa->id,
            'nama_lengkap' => $siswa->nama_lengkap,
            'nis' => $siswa->nis,
            'jenis_kelamin' => $siswa->jenis_kelamin,
            'tempat_lahir' => $siswa->tempat_lahir,
            'tanggal_lahir' => $siswa->tanggal_lahir,
            'alamat' => $siswa->alamat,
        ];

        $qr_code_content = json_encode($qrData);

        // Generate QR Code

        $qr_code_image = QrCode::format('svg')
            ->size(300)
            ->generate($qr_code_content);

        $qr_code_filename = Str::slug('qr-code-' . $siswa->nama_lengkap, '-') . '-' . time() . '.svg';
        $qr_code_path = 'uploads/qr-code-siswa/' . $qr_code_filename;

        // Simpan QR Code ke storage
        $qr_code_path = 'uploads/qr-code-siswa/' . $qr_code_filename;

        Storage::disk('public')->put($qr_code_path, $qr_code_image);

        // Update Siswa dengan QR code info
        $siswa->update([
            'qr_code_image' => $qr_code_filename,
            'qr_code_url' => Storage::url($qr_code_path),
        ]);

        session()->flash('success', 'Siswa berhasil ditambahkan');
        return redirect()->route('dashboard.siswa.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $siswa = \App\Models\Siswa::with(['kelas', 'golonganPramuka', 'tandaKecakapanKhusus'])->find($id);
        $kartu = \App\Models\KartuSiswa::all();
        foreach ($kartu as $item) {
            $item->url = $item->getFirstMediaUrl('cover-kartu-siswa');
        }
        $kartu = $kartu->map(function ($item) {
            return [
                'id' => $item->id,
                'cover' => $item->cover,
                'url' => $item->url,
            ];
        });

        $tkk = \App\Models\TandaKecakapanKhusus::get(['id', 'nama']);
        if (!$siswa) {
            session()->flash('error', 'Siswa tidak ditemukan');
            return redirect()->back();
        }

        return Inertia::render('admin/siswa/detail', [
            'siswa' => $siswa,
            'kartu' => $kartu,
            'tandaKecakapanKhusus' => $tkk,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $siswa = \App\Models\Siswa::find($id);
        $siswa->tkkIds = $siswa->tandaKecakapanKhusus->pluck('id')->toArray();

        $kelas = \App\Models\Kelas::get(['id', 'nama_kelas']);
        $golonganPramuka = \App\Models\GolonganPramuka::get(['id', 'nama_golongan']);
        $tkk = \App\Models\TandaKecakapanKhusus::get(['id', 'nama']);

        return Inertia::render('admin/siswa/manage', [
            'siswa' => $siswa,
            'kelas' => $kelas,
            'golonganPramuka' => $golonganPramuka,
            'tandaKecakapanKhusus' => $tkk,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validasi request
        $validated = $request->validate([
            'nama_lengkap' => 'string|max:255',
            'nis' => 'nullable|string|max:255',
            'jenis_kelamin' => 'nullable|string',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string|max:255',
            'kelas_id' => 'exists:kelas,id',
            'golongan_pramuka_id' => 'exists:golongan_pramukas,id',
            'tanda_kecakapan_khusus' => 'array',
            'tanda_kecakapan_khusus.*' => 'exists:tanda_kecakapan_khususes,id',
            'user_id' => 'nullable|exists:users,id',
        ], [
            'nama_lengkap.string' => 'Nama lengkap harus berupa string',
            'nama_lengkap.max' => 'Nama lengkap maksimal 255 karakter',
            'nis.string' => 'NIS harus berupa string',
            'nis.max' => 'NIS maksimal 255 karakter',
            'jenis_kelamin.string' => 'Jenis kelamin harus berupa string',
            'tempat_lahir.string' => 'Tempat lahir harus berupa string',
            'tempat_lahir.max' => 'Tempat lahir maksimal 255 karakter',
            'tanggal_lahir.date' => 'Tanggal lahir harus berupa tanggal',
            'alamat.string' => 'Alamat harus berupa string',
            'alamat.max' => 'Alamat maksimal 255 karakter',
            'kelas_id.exists' => 'Kelas tidak valid',
            'golongan_pramuka_id.exists' => 'Golongan pramuka tidak valid',
            'tanda_kecakapan_khusus.array' => 'Tanda kecakapan khusus harus berupa array',
            'tanda_kecakapan_khusus.*' => 'Tanda kecakapan khusus tidak valid',
            'user_id.exists' => 'User tidak valid',
        ]);

        // Cari siswa berdasarkan ID
        $siswa = \App\Models\Siswa::find($id);
        if (!$siswa) {
            session()->flash('error', 'Siswa tidak ditemukan');
            return redirect()->back();
        }

        // Update data siswa
        $siswa->update([
            'nama_lengkap' => $validated['nama_lengkap'],
            'nis' => $validated['nis'] ?? null,
            'jenis_kelamin' => $validated['jenis_kelamin'] ?? null,
            'tempat_lahir' => $validated['tempat_lahir'] ?? null,
            'tanggal_lahir' => $validated['tanggal_lahir'] ? date('Y-m-d', strtotime($validated['tanggal_lahir'])) : null,
            'alamat' => $validated['alamat'] ?? null,
            'kelas_id' => $validated['kelas_id'] ?? $siswa->kelas_id,
            'golongan_pramuka_id' => $validated['golongan_pramuka_id'] ?? $siswa->golongan_pramuka_id,
            'user_id' => $validated['user_id'] ?? $siswa->user_id,
        ]);

        $siswa->tandaKecakapanKhusus()->sync($validated['tanda_kecakapan_khusus']);

        // Hapus QR code lama jika ada
        if ($siswa->qr_code_url) {
            $qr_code_filepath = str_replace('storage/', '', $siswa->qr_code_url);
            $qr_code_filepath = storage_path('app/public/' . $qr_code_filepath);
            if (file_exists($qr_code_filepath)) {
                unlink($qr_code_filepath);
            }
        }

        // Regenerate QR code baru dengan data siswa yang diperbarui
        $qrData = [
            'id' => $siswa->id,
            'nama_lengkap' => $siswa->nama_lengkap,
            'nis' => $siswa->nis,
            'jenis_kelamin' => $siswa->jenis_kelamin,
            'tempat_lahir' => $siswa->tempat_lahir,
            'tanggal_lahir' => $siswa->tanggal_lahir,
            'alamat' => $siswa->alamat,
        ];

        $qr_code_content = json_encode($qrData);

        // Generate QR Code baru
        $qr_code_image = QrCode::format('svg')
            ->size(300)
            ->generate($qr_code_content);

        $qr_code_filename = Str::slug('qr-code-' . $siswa->nama_lengkap, '-') . '-' . time() . '.svg';
        $qr_code_path = 'uploads/qr-code-siswa/' . $qr_code_filename;

        // Simpan QR Code ke storage
        $qr_code_path = 'uploads/qr-code-siswa/' . $qr_code_filename;

        Storage::disk('public')->put($qr_code_path, $qr_code_image);

        // Update informasi QR code siswa
        $siswa->update([
            'qr_code_image' => $qr_code_filename,
            'qr_code_url' => Storage::url($qr_code_path),
        ]);

        session()->flash('success', 'Siswa berhasil diubah');
        return redirect()->route('dashboard.siswa.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $siswa = \App\Models\Siswa::find($id);

        if ($siswa->qr_code_url) {
            $qr_code_filepath = str_replace('storage/', '', $siswa->qr_code_url);
            $qr_code_filepath = storage_path('app/public/' . $qr_code_filepath);
            if (file_exists($qr_code_filepath)) {
                unlink($qr_code_filepath);
            }
        }

        $siswa->delete();

        session()->flash('success', 'Siswa berhasil dihapus');
        return redirect()->route('dashboard.siswa.index');
    }
}
