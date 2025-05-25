import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from './input-error';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function FormDatePicker({ label, id, date, onSelect = () => {}, error, placeholder }) {
    const [month, setMonth] = useState(new Date());
    const currentYear = new Date().getFullYear();
    const yearsRange = Array.from({ length: 150 }, (_, i) => currentYear - 100 + i);

    const handleMonthChange = (value) => {
        setMonth((prev) => new Date(prev.setMonth(parseInt(value))));
    };

    const handleYearChange = (value) => {
        setMonth((prev) => new Date(prev.setFullYear(parseInt(value))));
    };

    const renderSelectItems = (items, formatter) =>
        items.map((item) => (
            <SelectItem key={item} value={item.toString()}>
                {formatter(item)}
            </SelectItem>
        ));

    return (
        <div className="grid w-full gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Popover>
                <PopoverTrigger asChild className={error ? 'border-red-500 dark:border-red-400' : ''}>
                    <Button
                        variant="outline"
                        type="button"
                        className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', error && 'border-red-500')}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'dd/MM/yyyy') : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex gap-2 p-4">
                        <Select onValueChange={handleMonthChange} value={month.getMonth().toString()}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {renderSelectItems(
                                    Array.from({ length: 12 }, (_, index) => index),
                                    (index) => new Date(0, index).toLocaleString('default', { month: 'long' }),
                                )}
                            </SelectContent>
                        </Select>

                        <Select onValueChange={handleYearChange} value={month.getFullYear().toString()}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>{renderSelectItems(yearsRange, (year) => year)}</SelectContent>
                        </Select>
                    </div>

                    <Calendar mode="single" month={month} onMonthChange={setMonth} selected={date} onSelect={onSelect} initialFocus />
                </PopoverContent>
            </Popover>

            {error && <InputError message={error} />}
        </div>
    );
}
