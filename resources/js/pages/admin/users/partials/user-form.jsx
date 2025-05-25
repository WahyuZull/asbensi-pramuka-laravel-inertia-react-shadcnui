import { FormField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import { RoleSelector } from './role-selector';

export default function UserForm({ user, roles }) {
    const {
        data,
        setData,
        post,
        put: update,
        processing,
        errors,
    } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',
        roles: user?.roles?.map((role) => role.name) ?? [],
    });

    const handleSelectRoles = (selectedRole) => {
        const userRoles = [...data.roles];
        if (userRoles.includes(selectedRole)) {
            setData(
                'roles',
                userRoles.filter((role) => role !== selectedRole),
            );
        } else {
            setData('roles', [...userRoles, selectedRole]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            update(route('dashboard.users.update', user.id));
        } else {
            post(route('dashboard.users.store'));
        }
    };

    return (
        <>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <FormField
                            label="Nama"
                            id="name"
                            type="text"
                            value={data?.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="Jhon Doe"
                        />
                        <FormField
                            label="Email"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            placeholder="user@mail.com"
                        />
                        <FormField
                            label="Password"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                        />
                        <FormField
                            label="Konfimasi Password"
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                        />
                        <RoleSelector roles={roles} selectedRoles={data.roles} onRoleSelect={handleSelectRoles} error={errors.roles} />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={processing} onClick={handleSubmit}>
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </CardFooter>
        </>
    );
}
