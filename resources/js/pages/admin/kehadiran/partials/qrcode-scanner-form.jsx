import QRCodeScanner from '@/components/qrcode-scanner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScanQrCode } from 'lucide-react';
import { useState } from 'react';

export default function QRCodeForm() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>
                    <ScanQrCode />
                    <span className="hidden md:block">Scan QR Kehadiran</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tambah kehadiran</DialogTitle>
                    <DialogDescription>Klik simpan saat sudah selesai.</DialogDescription>
                </DialogHeader>

                <QRCodeScanner onOpenChange={setOpen} />
            </DialogContent>
        </Dialog>
    );
}
