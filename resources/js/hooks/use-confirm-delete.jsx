import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function useConfirmDelete() {
    const confirmDelete = ({ title = 'Delete item', description = 'Are you sure?', onConfirm }) => {
        toast((t) => (
            <div className="flex flex-1 items-center">
                <div className="w-full">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="ml-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => toast.dismiss(t)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                            toast.dismiss(t);
                            try {
                                await onConfirm();
                            } catch (err) {
                                toast.error('Failed to delete');
                            }
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        ));
    };

    return { confirmDelete };
}
