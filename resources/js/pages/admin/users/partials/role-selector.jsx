import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';

export const RoleSelector = ({ roles, selectedRoles, onRoleSelect, error }) => (
    <div className="grid gap-2">
        <Label>Role</Label>
        <Popover>
            <PopoverTrigger asChild className={error ? 'border-red-500' : ''}>
                <Button variant="outline" role="combobox" type="button" className="w-full justify-between">
                    <div className="flex justify-start gap-2">
                        {selectedRoles?.map((userRole, index) => {
                            return (
                                <Badge key={index} variant="secondary" className="rounded-md">
                                    {userRole}
                                </Badge>
                            );
                        }) ?? 'Select Roles'}
                    </div>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Pilih role..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Tidak ada role</CommandEmpty>
                        <CommandGroup>
                            {roles.map((role, index) => (
                                <CommandItem key={index} value={role?.name} onSelect={onRoleSelect}>
                                    {role?.name}
                                    <Check className={`${selectedRoles?.includes(role?.name) ? 'opacity-100' : 'opacity-0'} ml-auto`} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
);
