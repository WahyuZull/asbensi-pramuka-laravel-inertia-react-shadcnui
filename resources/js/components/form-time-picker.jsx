import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { ClockIcon, CheckIcon } from 'lucide-react';

const generateTimes = (interval = 30) => {
    const times = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += interval) {
            const hh = h.toString().padStart(2, '0');
            const mm = m.toString().padStart(2, '0');
            times.push(`${hh}:${mm}`);
        }
    }
    return times;
};

export default function FormTimePicker({ label, id, value, onChange, error }) {
    const [open, setOpen] = useState(false);
    const times = generateTimes();

    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="block mb-1 text-sm font-medium">{label}</label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn("w-full justify-between", !value && "text-muted-foreground")}
                    >
                        {value || "Pilih Jam"}
                        <ClockIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandGroup className="overflow-y-auto max-h-[300px]">
                            {times.map((time) => (
                                <CommandItem
                                    key={time}
                                    value={time}
                                    onSelect={() => {
                                        onChange(time);
                                        setOpen(false);
                                    }}
                                >
                                    {time}
                                    {value === time && (
                                        <CheckIcon className="ml-auto h-4 w-4 text-primary" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}
