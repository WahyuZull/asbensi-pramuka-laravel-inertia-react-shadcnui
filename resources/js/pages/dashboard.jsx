import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

const chartConfigs = {
    trend: {
        present: {
            label: 'Present',
            color: 'hsl(var(--chart-1))',
        },
        absent: {
            label: 'Absent',
            color: 'hsl(var(--chart-2))',
        },
    },
    distribution: {
        hadir: {
            label: 'Hadir',
            color: 'hsl(var(--chart-1))',
        },
        alpa: {
            label: 'Alpa',
            color: 'hsl(var(--chart-2))',
        },
        izin: {
            label: 'Izin',
            color: 'hsl(var(--chart-3))',
        },
        sakit: {
            label: 'Sakit',
            color: 'hsl(var(--chart-4))',
        },
    },
};

const transformTrendData = (trendKehadiran) => {
    return trendKehadiran.map(({ tanggal, total_hadir, total_tidak_hadir }) => ({
        date: tanggal,
        present: total_hadir,
        absent: total_tidak_hadir,
    }));
};

const transFormDistribData = (distribKehadiran) => {
    return distribKehadiran.map(({ status, value }) => ({
        status: status,
        value: value,
    }));
};

const transformRekapData = (rekapKehadiranKelas, kelas) => {
    return rekapKehadiranKelas.map(({ kelas_id, total_hadir, total_sakit, total_izin, total_alpa }) => ({
        kelas: kelas.find((kls) => kls.id === kelas_id).nama_kelas,
        hadir: total_hadir,
        alpa: total_izin,
        izin: total_alpa,
        sakit: total_sakit,
    }));
};

const StatCard = ({ title, value, subtext, comparison }) => (
    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
        <h3 className="mb-2 font-semibold">{title}</h3>
        <div className="flex flex-col">
            <div className="text-3xl font-bold">{value}</div>
            <div className={cn('text-sm', comparison ? (comparison > 0 ? 'text-green-500' : 'text-red-500') : 'text-gray-500')}>{subtext}</div>
        </div>
    </div>
);

const ChartWrapper = ({ title, height = '300px', children }) => (
    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
        <h3 className="mb-4 font-semibold">{title}</h3>
        <div className="h-[300px]">{children}</div>
    </div>
);

const NoDataDisplay = () => (
    <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-500">Tidak ada data</p>
    </div>
);

export default function Dashboard() {
    const { kehadiran, trendKehadiran, distribusiStatusKehadiran, rekapKehadiranKelas, kelas } = usePage().props;

    const chartTrendKehadiran = transformTrendData(trendKehadiran);
    const chartRekapKehadiran = transformRekapData(rekapKehadiranKelas, kelas);
    const chartDistribusiStatusKehadiran = transFormDistribData(distribusiStatusKehadiran);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <StatCard title="Kehadiran Hari Ini" value={`${kehadiran?.presentase?.hadir}%`} subtext="Siswa" />
                    <StatCard title="Total Ketidakhadiran" value={kehadiran?.total_tidak_hadir} subtext="Siswa" />
                    <StatCard
                        title="Rata-rata Kehadiran"
                        value={`${kehadiran?.bulan_ini?.presentase?.hadir}%`}
                        subtext={`${kehadiran?.perbandingan_bulan_ini_dan_kemarin?.hadir}% dari bulan lalu`}
                        comparison={kehadiran?.perbandingan_bulan_ini_dan_kemarin?.hadir}
                    />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <ChartWrapper title="Tren Kehadiran Mingguan">
                        {chartTrendKehadiran.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <ChartContainer className="h-full w-full p-2.5" config={chartConfigs.trend}>
                                    <AreaChart accessibilityLayer data={chartTrendKehadiran} margin={{ left: 12, right: 12 }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        <defs>
                                            <linearGradient id="fillPresent" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                                            </linearGradient>
                                            <linearGradient id="fillAbsent" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="present"
                                            type="monotone"
                                            fill="url(#fillPresent)"
                                            fillOpacity={0.4}
                                            stroke="#10B981"
                                            name="Hadir"
                                        />
                                        <Area
                                            dataKey="absent"
                                            type="monotone"
                                            fill="url(#fillAbsent)"
                                            fillOpacity={0.4}
                                            stroke="#EF4444"
                                            name="Tidak Hadir"
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </ResponsiveContainer>
                        ) : (
                            <NoDataDisplay />
                        )}
                    </ChartWrapper>
                    <ChartWrapper title="Distribusi Status Kehadiran">
                        {chartDistribusiStatusKehadiran?.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <ChartContainer className="h-full w-full p-2.5" config={chartConfigs.distribution}>
                                    <PieChart>
                                        <Pie
                                            data={chartDistribusiStatusKehadiran}
                                            dataKey="value"
                                            nameKey="status"
                                            // cx="50%"
                                            // cy="50%"
                                            innerRadius={60}
                                            strokeWidth={5}
                                            // fill="#8884d8"
                                            // label
                                        >
                                            {chartDistribusiStatusKehadiran.map((entry, index) => {
                                                const colors = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B'];
                                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                                            })}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                    </PieChart>
                                </ChartContainer>
                            </ResponsiveContainer>
                        ) : (
                            <NoDataDisplay />
                        )}
                    </ChartWrapper>
                    <div className="md:col-span-2">
                        <ChartWrapper title="Rekap Kehadiran per Kelas">
                            {rekapKehadiranKelas?.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ChartContainer className="h-full w-full p-2.5" config={chartConfigs.distribution}>
                                        <BarChart
                                            data={chartRekapKehadiran}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="kelas" tickLine={false} axisLine={false} tickMargin={8} />
                                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                            <Legend />
                                            <Bar dataKey="hadir" name="Hadir" fill="#10B981" />
                                            <Bar dataKey="alpa" name="Alpa" fill="#EF4444" />
                                            <Bar dataKey="izin" name="Izin" fill="#3B82F6" />
                                            <Bar dataKey="sakit" name="Sakit" fill="#F59E0B" />
                                        </BarChart>
                                    </ChartContainer>
                                </ResponsiveContainer>
                            ) : (
                                <NoDataDisplay />
                            )}
                        </ChartWrapper>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
