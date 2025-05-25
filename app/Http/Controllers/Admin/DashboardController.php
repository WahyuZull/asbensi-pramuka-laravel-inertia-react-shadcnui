<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JadwalKehadiran;
use App\Models\Kehadiran;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = now();
        $currentMonth = $today->month;
        $lastMonth = $today->copy()->subMonth()->month;

        // Kehadiran Hari Ini
        $jadwalHariIni = JadwalKehadiran::whereDate('tanggal', $today)->first();
        $kehadiran = $jadwalHariIni ? Kehadiran::whereDate('tanggal', $today)->get() : collect([]);
        
        $kehadiranStats = $this->getKehadiranStats($kehadiran);

        $totalSiswaHariIni = Siswa::whereHas('kelas', function ($query) use ($today) {
            $query->whereIn('id', JadwalKehadiran::whereDate('tanggal', $today)->pluck('kelas_id'));
        })->count();

        $presentaseHariIni = $this->hitungPresentase($kehadiranStats, $totalSiswaHariIni);

        // Kehadiran Bulanan
        $kehadiranBulanIni = Kehadiran::whereMonth('tanggal', $currentMonth)->get();
        $kehadiranBulanKemarin = Kehadiran::whereMonth('tanggal', $lastMonth)->get();

        $statsBulanIni = $this->getKehadiranStats($kehadiranBulanIni);
        $statsBulanKemarin = $this->getKehadiranStats($kehadiranBulanKemarin);

        $presentaseBulanIni = $this->hitungPresentase($statsBulanIni, $kehadiranBulanIni->count());
        $presentaseBulanKemarin = $this->hitungPresentase($statsBulanKemarin, $kehadiranBulanKemarin->count());

        $perbandinganBulan = $this->hitungPerbandingan($presentaseBulanIni, $presentaseBulanKemarin);

        // Data Agregat
        $trendKehadiran = Kehadiran::selectRaw('DATE(tanggal) as tanggal, 
            SUM(CASE WHEN status = "hadir" THEN 1 ELSE 0 END) as total_hadir,
            SUM(CASE WHEN status != "hadir" THEN 1 ELSE 0 END) as total_tidak_hadir')
            ->groupBy('tanggal')
            ->orderBy('tanggal')
            ->get();

        $distribusiStatusKehadiran = Kehadiran::selectRaw('status, COUNT(*) as total')
            ->whereIn('status', ['hadir', 'izin', 'sakit', 'alpa'])
            ->groupBy('status')
            ->get();

        $rekapKehadiranKelas = Kehadiran::selectRaw('kelas_id, 
            SUM(CASE WHEN status = "hadir" THEN 1 ELSE 0 END) as total_hadir,
            SUM(CASE WHEN status = "izin" THEN 1 ELSE 0 END) as total_izin,
            SUM(CASE WHEN status = "sakit" THEN 1 ELSE 0 END) as total_sakit,
            SUM(CASE WHEN status = "alpa" THEN 1 ELSE 0 END) as total_alpa')
            ->groupBy('kelas_id')
            ->get();

        return Inertia::render('dashboard', [
            'kehadiran' => [
                'hadir' => $kehadiranStats['hadir'],
                'izin' => $kehadiranStats['izin'],
                'sakit' => $kehadiranStats['sakit'],
                'alpa' => $kehadiranStats['alpa'],
                'total_tidak_hadir' => $totalSiswaHariIni - $kehadiranStats['hadir'],
                'presentase' => $presentaseHariIni,
                'bulan_ini' => ['presentase' => $presentaseBulanIni],
                'bulan_kemarin' => ['presentase' => $presentaseBulanKemarin],
                'perbandingan_bulan_ini_dan_kemarin' => $perbandinganBulan,
            ],
            'totalSiswaHariIni' => $totalSiswaHariIni,
            'trendKehadiran' => $trendKehadiran,
            'distribusiStatusKehadiran' => $distribusiStatusKehadiran,
            'rekapKehadiranKelas' => $rekapKehadiranKelas,
            'kelas' => Kelas::get(['id', 'nama_kelas']),
        ]);
    }

    private function getKehadiranStats($kehadiran)
    {
        return [
            'hadir' => $kehadiran->where('status', 'hadir')->count(),
            'izin' => $kehadiran->where('status', 'izin')->count(),
            'sakit' => $kehadiran->where('status', 'sakit')->count(),
            'alpa' => $kehadiran->where('status', 'alpa')->count(),
        ];
    }

    private function hitungPresentase($stats, $total)
    {
        if ($total <= 0) {
            return array_fill_keys(['hadir', 'izin', 'sakit', 'alpa'], 0);
        }

        return array_map(function ($value) use ($total) {
            return round(($value / $total) * 100, 2);
        }, $stats);
    }

    private function hitungPerbandingan($presentaseBulanIni, $presentaseBulanKemarin)
    {
        $hasil = array_map(function ($current, $previous) {
            return round($current - $previous, 2);
        }, $presentaseBulanIni, $presentaseBulanKemarin);

        return array_combine(array_keys($presentaseBulanIni), $hasil);
    }
}
