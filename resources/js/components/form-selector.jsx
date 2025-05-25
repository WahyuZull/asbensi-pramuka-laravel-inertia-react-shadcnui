import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from './input-error';

export const FormSelector = ({ id, label, value, options, onChange = () => {}, placeholder, error }) => {
    const selectedOption = options.find((opt) => opt.value === value);    
    return (
        <div className="grid w-full gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Select onValueChange={onChange} value={value}>
                <SelectTrigger className={`${error ? 'border-red-500 dark:border-red-400' : ''} w-full`}>
                    <SelectValue placeholder={placeholder}>{selectedOption?.label}</SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full">
                    <SelectGroup>
                        <SelectLabel>{placeholder}</SelectLabel>
                        {options.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {error && <InputError message={error} />}
        </div>
    );
};
