import { postKehadiran } from '@/service/kehadiran.services';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function QRCodeScanner({ onOpenChange }) {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('qr-reader', {
            fps: 10,
            qrbox: 250,
        });

        scanner.render(async (decodedText) => {
            try {
                const data = JSON.parse(decodedText);
                // Lakukan post data ke route API Kehadiran
                const response = await postKehadiran(data.id);
                toast.success(response?.data?.message);
                await scanner.clear();
                // await onOpenChange(false);
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        });
    }, []);

    return <div id="qr-reader" />;
}
