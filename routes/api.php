<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    // Define your API routes here
    
});

Route::post('/kehadiran/siswa/qr-code', [\App\Http\Controllers\API\KehadiranSiswaController::class, 'store']);