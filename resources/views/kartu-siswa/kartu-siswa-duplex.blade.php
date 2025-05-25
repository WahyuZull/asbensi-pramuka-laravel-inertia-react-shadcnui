@props(['siswas'])

@php
    function imageToBase64($path) {
        return file_exists($path)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($path))
            : '';
    }

    $bgDepan = imageToBase64(public_path('storage/kartu-siswa-depan.png'));
    $bgBelakang = imageToBase64(public_path('storage/kartu-siswa-belakang.png'));

    // Split siswa ke dalam kelompok 4 per halaman
    $chunks = $siswas->chunk(4);
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

    .page {
        width: 210mm;
        height: 297mm;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: space-evenly;
        padding: 10mm;
        box-sizing: border-box;
        page-break-after: always;
    }

    .card {
        width: 85.60mm;
        height: 53.98mm;
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 5px;
        overflow: hidden;
    }

    .card-content {
        position: absolute;
        bottom: 5mm;
        left: 5mm;
        right: 5mm;
        font-size: 8pt;
    }

    .qr-container {
        position: absolute;
        top: 50%;
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

@foreach ($chunks as $chunk)
    {{-- Halaman Depan --}}
    <div class="page">
        @foreach ($chunk as $siswa)
            <div class="card" style="background-image: url('{{ $bgDepan }}')">
                <div class="card-content">
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

    {{-- Halaman Belakang --}}
    <div class="page">
        @foreach ($chunk as $siswa)
            @php
                $qrCode = imageToBase64(public_path($siswa->qr_code_url ?? ''));
            @endphp
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
