import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getAllQueryParams = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const query = {};
    for (let param of params) {
        query[param[0]] = param[1];
    }
    return query;
};

export const getQueryParam = (key) => {
    return getAllQueryParams()[key];
};

export const GOLONGAN_PRAMUKA_MAPPER = {
    Penggalang: 'bg-red-500/10 text-red-500 border-red-500',
    Siaga: 'bg-green-500/10 text-green-500 border-green-500',
};

export const NAMA_KELAS_MAPPER = {
    '3-a': 'bg-blue-500/10 text-blue-500 border-blue-500',
    '3-b': 'bg-green-500/10 text-green-500 border-green-500',
    '4-a': 'bg-yellow-500/10 text-yellow-500 border-yellow-500',
    '4-b': 'bg-orange-500/10 text-orange-500 border-orange-500',
    '5-a': 'bg-red-500/10 text-red-500 border-red-500',
    '5-b': 'bg-purple-500/10 text-purple-500 border-purple-500',
    '6-a': 'bg-indigo-500/10 text-indigo-500 border-indigo-500',
    '6-b': 'bg-cyan-500/10 text-cyan-500 border-cyan-500',
};

export const GENDER_MAPPER = {
    Perempuan: 'bg-pink-500/10 text-pink-500 border-pink-500',
    'Laki-laki': 'bg-blue-500/10 text-blue-500 border-blue-500',
};

export const ROLE_MAPPER = {
    admin: 'bg-red-500/10 text-red-500 border-red-500',
    siswa: 'bg-green-500/10 text-green-500 border-green-500',
    guru: 'bg-blue-500/10 text-blue-500 border-blue-500',
};

export const STATUS_KEHADIRAN_MAPPER = {
    hadir: 'bg-green-500/10 text-green-500 border-green-500',
    alpa: 'bg-red-500/10 text-red-500 border-red-500',
    sakit: 'bg-yellow-500/10 text-yellow-500 border-yellow-500',
    izin: 'bg-blue-500/10 text-blue-500 border-blue-500',
};

export const STATUS_KEHADIRAN_OPTIONS = [
    { value: 'hadir', label: 'Hadir' },
    { value: 'izin', label: 'Izin' },
    { value: 'sakit', label: 'Sakit' },
    { value: 'alpa', label: 'Alpa' },
];

export const GENDER_OPTIONS = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' },
];

export const timeFormatLocale = (value) => {
    return new Date(value).toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatTanggal = (value) => {
    return new Date(value).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};
