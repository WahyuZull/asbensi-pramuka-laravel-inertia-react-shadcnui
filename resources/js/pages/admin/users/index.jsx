import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { cn, getAllQueryParams, ROLE_MAPPER } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '../../../components/data-table';
import { Button } from '../../../components/ui/button';
import { useConfirmDelete } from '../../../hooks/use-confirm-delete';
import { route } from 'ziggy-js';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Users',
        href: route('dashboard.users.index'),
    },
];

export default function UsersIndex() {
    const { users } = usePage().props;
    const { data, ...pagination } = users;
    const [selectedUsers, setSelectedUsers] = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchUser = (value) => {
        router.get(route('dashboard.users.index'), {
            ...queryParams,
            search: value,
        });
    };

    const { confirmDelete } = useConfirmDelete();
    const handleDeleteUser = (id) => {
        confirmDelete({
            title: 'Delete User',
            description: 'Are you sure you want to delete this user?',
            onConfirm: () => router.delete(route('dashboard.users.destroy', id)),
        });
    };

    const usersColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedUsers.length === data.length && data.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedUsers(data.map((user) => user.id));
                            } else {
                                setSelectedUsers([]);
                            }
                        }}
                        aria-label="Select all"
                    />
                </div>
            ),
            dataIndex: 'id',
            render: (value) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedUsers.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedUsers([...selectedUsers, value]);
                            } else {
                                setSelectedUsers(selectedUsers.filter((id) => id !== value));
                            }
                        }}
                        aria-label="Select row"
                    />
                </div>
            ),
        },
        {
            title: 'No',
            render: (_, index) => pagination.from + index,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            render: (value) => {
                return value.map((role) => (
                    <Badge key={role.id} className={cn(ROLE_MAPPER[role.name])}>
                        {role.name}
                    </Badge>
                ));
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.users.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteUser(value)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="container py-4">
                <Heading title="Users" description="Data daftar users" />

                <div className="">
                    <Link href={route('dashboard.users.create')}>
                        <Button className="bg-green-700/80">
                            <Plus className="hidden md:block" />
                            Tambah User
                        </Button>
                    </Link>
                </div>
                <DataTable
                    dataSource={data}
                    columns={usersColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchUser}
                    selectedRows={selectedUsers.length}
                />
            </div>
        </AppLayout>
    );
}
