@props(['siswa'])

@php
    function imageToBase64($path)
    {
        return file_exists($path) ? 'data:image/png;base64,' . base64_encode(file_get_contents($path)) : '';
    }

    $bgDepan = imageToBase64(public_path('storage/kartu-siswa-depan.png'));
    $bgBelakang = imageToBase64(public_path('storage/kartu-siswa-belakang.png'));
    $qrCode = imageToBase64(public_path($siswa->qr_code_url ?? ''));
@endphp

<style>
    @page {
        size: A4;
        margin: 0;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    .container {
        width: 210mm;
        height: 297mm;
        position: relative;
    }

    .card {
        width: 85.60mm;
        height: 53.98mm;
        border-radius: 5px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
    }

    .card-depan {
        left: 15mm;
        top: 100mm;
    }

    .card-belakang {
        left: 115mm;
        top: 100mm;
    }

    .content {
        position: absolute;
        bottom: 8mm;
        left: 5mm;
        right: 5mm;
        font-size: 9pt;
    }

    .qr-container {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .qr-box {
        background-color: #fff;
        padding: 2mm;
        border-radius: 5px;
        display: inline-block;
    }

    .qr-box img {
        width: 16mm;
        height: 16mm;
    }

    .qr-caption {
        font-size: 8pt;
        font-style: italic;
        margin-top: 1mm;
    }
</style>

<div class="container">
    {{-- Kartu Depan --}}
    <div class="card card-depan" style="background-image: url('{{ $bgDepan }}')">
        <div class="content">
            <table width="100%">
                <tr>
                    <td width="30%" style="font-weight: bold; vertical-align: top;">NIS</td>
                    <td width="5%" style="vertical-align: top;">:</td>
                    <td style="vertical-align: top;">{{ $siswa->nis ?? '-' }}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; vertical-align: top;">Nama</td>
                    <td style="vertical-align: top;">:</td>
                    <td style="vertical-align: top;">{{ $siswa->nama_lengkap }}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; vertical-align: top;">Jenis Kelamin</td>
                    <td style="vertical-align: top;">:</td>
                    <td style="vertical-align: top;">{{ $siswa->jenis_kelamin ?? '-' }}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; vertical-align: top;">Tempat Tanggal Lahir</td>
                    <td style="vertical-align: top;">:</td>
                    <td style="vertical-align: top;">
                        {{ $siswa->tempat_lahir ? $siswa->tempat_lahir . ', ' . $siswa->tanggal_lahir : '-' }}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; vertical-align: top;">Alamat</td>
                    <td style="vertical-align: top;">:</td>
                    <td style="vertical-align: top;">{{ $siswa->alamat ?? '-' }}</td>
                </tr>
            </table>
        </div>
    </div>

    {{-- Kartu Belakang --}}
    <div class="card card-belakang" style="background-image: url('{{ $bgBelakang }}')">
        <div class="qr-container">
            <div class="qr-box">
                @if ($qrCode)
                    <img src="{{ $qrCode }}" alt="QR Code">
                @else
                    <div style="width: 20mm; height: 20mm; background: #ccc;"></div>
                @endif
            </div>
            <div class="qr-caption">Scan to view</div>
        </div>
    </div>
</div>
