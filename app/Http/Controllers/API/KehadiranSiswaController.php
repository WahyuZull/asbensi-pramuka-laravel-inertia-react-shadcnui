<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KehadiranSiswaController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'siswa_id' => 'required|exists:siswas,id',

            ], [
                'siswa_id.required' => 'Siswa harus dipilih.',
                'siswa_id.exists' => 'Siswa tidak ditemukan.',

            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors()->first(), 422);
            }

            $siswa = \App\Models\Siswa::find($request['siswa_id']);
            if (!$siswa) {
                return $this->sendError('Siswa tidak ditemukan.', [], 404);
            }

            $jadwalHariIni = \App\Models\JadwalKehadiran::where('kelas_id', $siswa->kelas_id)
                ->whereDate('tanggal', now()->format('Y-m-d'))
                ->first();

            if (!$jadwalHariIni) {
                return $this->sendError('Tidak ada jadwal kehadiran untuk hari ini.', [], 422);
            }

            $kehadiranHariIni = \App\Models\Kehadiran::where('siswa_id', $request['siswa_id'])
                ->whereDate('tanggal', now()->format('Y-m-d'))
                ->first();

            if ($kehadiranHariIni) {
                return $this->sendError('Siswa sudah absen hari ini.', [], 422);
            }

            $kehadiran = \App\Models\Kehadiran::create([
                'tanggal' => now()->locale('id'),
                'siswa_id' => $request['siswa_id'],
                'kelas_id' => $siswa->kelas_id,
                'status' => 'hadir',
            ]);

            return $this->sendResponse($kehadiran, 'Berhasil absen.', 201);
        } catch (\Exception $e) {
            return $this->sendError('Internal server error', [], 500);
        }
    }
}
