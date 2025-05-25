import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import {
    CalendarCheck,
    CalendarDays,
    GraduationCap,
    IdCard,
    KeyRound,
    LayoutDashboard,
    ListChecks,
    PencilRuler,
    School,
    Tent,
    Users,
} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Data Kelas',
        tooltip: 'Data Kelas',
        url: route('dashboard.kelas.index'),
        icon: School,
    },
    {
        title: 'Data Siswa',
        tooltip: 'Data Siswa',
        url: route('dashboard.siswa.index'),
        icon: GraduationCap,
    },
    {
        title: 'Golongan Pramuka',
        tooltip: 'Golongan Pramuka',
        url: route('dashboard.golongan-pramuka.index'),
        icon: Tent,
    },
    {
        title: 'Tanda Kecakapan Khusus',
        tooltip: 'Tanda Kecakapan Khusus',
        url: route('dashboard.tanda-kecakapan-khusus.index'),
        icon: PencilRuler,
    }
];

const secondNavItems = [
    {
        title: 'Jadwal Kehadiran',
        tooltip: 'Jadwal Kehadiran',
        url: route('dashboard.jadwal-kehadiran.index'),
        icon: CalendarCheck,
    },
    {
        title: 'Daftar Kehadiran',
        tooltip: 'Daftar Kehadiran',
        url: route('dashboard.kehadiran.index'),
        icon: ListChecks,
    },
    {
        title: 'Rekap Kehadiran',
        tooltip: 'Rekap Kehadiran',
        url: route('dashboard.rekap-kehadiran.index'),
        icon: CalendarDays,
    },
];

const settingNavItems = [
    {
        title: 'Kartu Siswa',
        tooltip: 'Kartu Siswa',
        url: route('dashboard.setting-kartu-siswa.index'),
        icon: IdCard,
    },
];

const footerNavItems = [
    {
        title: 'Users',
        tooltip: 'Users',
        url: route('dashboard.users.index'),
        icon: Users,
    },
    {
        title: 'Roles',
        tooltip: 'Roles',
        url: route('dashboard.roles.index'),
        icon: KeyRound,
    },
];

export function AppSidebar() {
    const { flash, auth } = usePage().props;

    const role = auth.user.roles[0].name;
    const isAdmin = role === 'admin';
    const isGuru = role === 'guru';

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard.index')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="px-2 py-0">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Dashboard">
                            <Link href={route('dashboard.index')} prefetch>
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <NavMain title={'Data'} items={mainNavItems} />
                <NavMain title={'Pramuka'} items={secondNavItems} />
                <NavMain title={'Settings'} items={settingNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {isAdmin && <NavFooter items={footerNavItems} className="mt-auto" />}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
