@props(['siswas'])

@php
    function imageToBase64($path) {
        return file_exists($path)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($path))
            : '';
    }

    $bgDepan = imageToBase64(public_path('storage/kartu-siswa-depan.png'));
    $bgBelakang = imageToBase64(public_path('storage/kartu-siswa-belakang.png'));
@endphp

<style>
    @page {
        size: A4;
        margin: 10mm;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    .page {
        width: 190mm;
        height: auto;
        page-break-inside: avoid;
    }

    .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10mm;
    }

    .card {
        width: 85.60mm;
        height: 53.98mm;
        border-radius: 5px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
    }

    .content {
        position: absolute;
        bottom: 8mm;
        left: 5mm;
        right: 5mm;
        font-size: 8.5pt;
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

<div class="page">
    @foreach($siswas->chunk(2) as $chunk)
        <div class="row">
            @foreach($chunk as $siswa)
                @php
                    $qrCode = imageToBase64(public_path($siswa->qr_code_url ?? ''));
                @endphp
                {{-- Kartu Depan --}}
                <div class="card" style="background-image: url('{{ $bgDepan }}')">
                    <div class="content">
                        <table width="100%">
                            <tr><td width="30%" style="font-weight: bold;">NIS</td><td width="5%">:</td><td>{{ $siswa->nis ?? '-' }}</td></tr>
                            <tr><td style="font-weight: bold;">Nama</td><td>:</td><td>{{ $siswa->nama_lengkap }}</td></tr>
                            <tr><td style="font-weight: bold;">JK</td><td>:</td><td>{{ $siswa->jenis_kelamin ?? '-' }}</td></tr>
                            <tr>
                                <td style="font-weight: bold;">TTL</td><td>:</td>
                                <td>{{ $siswa->tempat_lahir ? $siswa->tempat_lahir . ', ' . $siswa->tanggal_lahir : '-' }}</td>
                            </tr>
                            <tr><td style="font-weight: bold;">Alamat</td><td>:</td><td>{{ $siswa->alamat ?? '-' }}</td></tr>
                        </table>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="row">
            @foreach($chunk as $siswa)
                @php
                    $qrCode = imageToBase64(public_path($siswa->qr_code_url ?? ''));
                @endphp
                {{-- Kartu Belakang --}}
                <div class="card" style="background-image: url('{{ $bgBelakang }}')">
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
            @endforeach
        </div>
    @endforeach
</div>
