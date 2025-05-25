<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route admin & guru
    Route::prefix('dashboard')->as('dashboard.')->middleware(['role_or_permission:admin|guru'])->group(function () {
        Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('index');

        Route::resource('kelas', \App\Http\Controllers\Admin\KelasCrudController::class)->names(['kelas']);
        Route::resource('siswa', \App\Http\Controllers\Admin\SiswaCrudController::class)->names(['siswa']);
        Route::resource('golongan-pramuka', \App\Http\Controllers\Admin\GolonganPramukaCrudController::class)->names(['golongan-pramuka']);
        Route::resource('tanda-kecakapan-khusus', \App\Http\Controllers\Admin\TKKCrudController::class)->names(['tanda-kecakapan-khusus']);

        Route::prefix('export')->group(function () {
            Route::get('siswa', [\App\Http\Controllers\Admin\ExportSiswaController::class, 'index'])->name('export.siswa.index');
            Route::get('siswa/download', [\App\Http\Controllers\Admin\ExportSiswaController::class, 'download'])->name('export.siswa.download');
            Route::get('siswa/print', [\App\Http\Controllers\Admin\ExportSiswaController::class, 'bulkPrint'])->name('export.siswa.bulkPrint');
            Route::get('siswa/{siswa}/print', [\App\Http\Controllers\Admin\ExportSiswaController::class, 'print'])->name('export.siswa.print');
        });

        Route::prefix('import')->group(function () {
            Route::get('siswa', [\App\Http\Controllers\Admin\ImportSiswaController::class, 'index'])->name('import.siswa.index');
            Route::post('siswa/upload', [\App\Http\Controllers\Admin\ImportSiswaController::class, 'upload'])->name('import.siswa.upload');
            Route::get('siswa/download-template', [\App\Http\Controllers\Admin\ImportSiswaController::class, 'downloadTemplate'])->name('import.siswa.downloadTemplate');
        });

        Route::resource('jadwal-kehadiran', \App\Http\Controllers\Admin\JadwalKehadiranCrudController::class)->names(['jadwal-kehadiran']);
        Route::resource('kehadiran', \App\Http\Controllers\Admin\KehadiranSiswaCrudController::class)->names(['kehadiran']);
        Route::resource('rekap-kehadiran', \App\Http\Controllers\Admin\RekapKehadiranCrudController::class)->names(['rekap-kehadiran']);
        Route::resource('setting-kartu-siswa', \App\Http\Controllers\Admin\KartuSiswaCrudController::class)->names('setting-kartu-siswa');

        Route::resource('users', \App\Http\Controllers\Admin\UserCrudController::class)->names(['users'])->middleware(['role_or_permission:admin']);
        Route::resource('roles', \App\Http\Controllers\Admin\RoleCrudController::class)->names(['roles'])->middleware(['role_or_permission:admin']);
    });

    // Route siswa
    Route::prefix('member')->as('member.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('member/index');
        })->name('index');
        Route::get('/profile', function () {
            return Inertia::render('member/profile');
        })->name('profile');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
