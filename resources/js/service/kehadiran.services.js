import axios from 'axios';

export const postKehadiran = async (siswaId) => {
    await axios.post(
        '/api/kehadiran/siswa/qr-code',
        {
            siswa_id: siswaId,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );
};
