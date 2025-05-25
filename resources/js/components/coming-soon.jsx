import { TriangleAlert } from 'lucide-react';

export default function ComingSoon() {
    return (
        <div className="h-[300px] w-full">
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-medium">We'll Coming Soon!</h1>
                    <p className="text-foreground mt-3 flex items-center gap-3">
                        <span className="text-orange-400">
                            <TriangleAlert />
                        </span>
                        This feature is underconstruction.
                        <span className="text-orange-400">
                            <TriangleAlert />
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
