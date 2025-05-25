import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import InputError from './input-error';
import { Badge } from './ui/badge';
import { Label } from './ui/label';

export function FormComboBox({ id, label, options, onSelect, selectedOption, placeholder, error, disabled = false, ...props }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="grid w-full gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Popover open={open} onOpenChange={setOpen} className="w-full">
                <PopoverTrigger asChild className={error ? 'border-red-500 dark:border-red-400' : ''}>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-full" disabled={disabled}>
                        
                        {Array.isArray(selectedOption) ? (
                            <div className="flex justify-start gap-2 flex-wrap">
                                {selectedOption?.map((selOpt, index) => {
                                    const option = options?.find((opt) => opt.value === selOpt);
                                    return option ? <Badge key={index}>{option.label}</Badge> : null;
                                })}
                            </div>
                        ) : selectedOption && options?.find((opt) => opt.value === selectedOption) ? (
                            options?.find((opt) => opt.value === selectedOption)?.label
                        ) : (
                            placeholder
                        )}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder={placeholder} className="h-9" />
                        <CommandList>
                            <CommandEmpty>Tidak ada data</CommandEmpty>
                            <CommandGroup>
                                {options?.map((opt) => (
                                    <CommandItem
                                        key={opt.value}
                                        value={opt.label}
                                        onSelect={() => {
                                            onSelect(opt.value);
                                            setOpen(false);
                                        }}
                                    >
                                        {opt.label}
                                        <Check className={cn('ml-auto', selectedOption?.includes(opt.value) ? 'opacity-100' : 'opacity-0')} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && <InputError message={error} />}
        </div>
    );
}
