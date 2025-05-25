import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from './input-error';

export const FormField = ({
    label,
    id,
    type,
    value,
    onChange = () => {},
    error,
    placeholder,
    ...props
}) => (
    <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        {type === 'textarea' ? (
            <Textarea
                {...props}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                rows={5}
                className={error ? 'border-red-500 dark:border-red-400' : ''}
            />
        ) : (
            <Input
                {...props}
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={error ? 'border-red-500 dark:border-red-400' : ''}
            />
        )}

        {error && <InputError message={error} />}
    </div>
);
