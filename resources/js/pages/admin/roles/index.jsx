import Heading from '@/components/heading';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { getAllQueryParams } from '@/lib/utils';
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
        title: 'Roles',
        href: route('dashboard.roles.index'),
    },
];

export default function RolesIndex() {
    const { roles } = usePage().props;
    const { data, ...pagination } = roles;
    const [selectedRoles, setSelectedRoles] = useState([]);

    const queryParams = getAllQueryParams();
    const handleSearchRole = (value) => {
        router.get(route('dashboard.roles.index'), {
            ...queryParams,
            search: value,
        });
    };

    const { confirmDelete } = useConfirmDelete();
    const handleDeleteRole = (id) => {
        confirmDelete({
            title: 'Delete Role',
            description: 'Are you sure you want to delete this Role?',
            onConfirm: () => router.delete(route('dashboard.roles.destroy', id)),
        });
    };

    const rolesColumns = [
        {
            title: (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={selectedRoles.length === data.length && data.length > 0}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedRoles(data.map((role) => role.id));
                            } else {
                                setSelectedRoles([]);
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
                        checked={selectedRoles.includes(value)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedRoles([...selectedRoles, value]);
                            } else {
                                setSelectedRoles(selectedRoles.filter((id) => id !== value));
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
            title: 'Action',
            dataIndex: 'id',
            render: (value) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('dashboard.roles.edit', value)}>
                            <Button variant="outline" size="icon">
                                <Edit />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteRole(value)}>
                            <Trash />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="container py-4">
                <Heading title="Roles" description="Data daftar roles" />
                <div className="">
                    <Link href={route('dashboard.roles.create')}>
                        <Button className="bg-green-700/80">
                            <Plus className="hidden md:block" />
                            Tambah Role
                        </Button>
                    </Link>
                </div>
                <DataTable
                    dataSource={data}
                    columns={rolesColumns}
                    pagination={pagination}
                    searchable
                    handleSearch={handleSearchRole}
                    selectedRows={selectedRoles.length}
                />
            </div>
        </AppLayout>
    );
}
