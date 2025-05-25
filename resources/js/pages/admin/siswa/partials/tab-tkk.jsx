import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

export default function TabTKKSiswa({ siswa, tandaKecakapanKhusus }) {
    const chartData = tandaKecakapanKhusus?.map((item) => ({
        name: item.nama,
        tkk_siswa: siswa?.tanda_kecakapan_khusus?.find((tkk) => tkk.nama === item.nama) ? 100 : 0,
        tkk_pramuka: 100,
    }));

    const chartConfig = {
        tkk_siswa: {
            label: 'TKK-Siswa',
            color: 'hsl(var(--chart-1))',
        },
        tkk_pramuka: {
            label: 'TKK-Pramuka',
            color: 'hsl(var(--chart-2))',
        },
    };

    return (
        <Card className="w-full md:max-w-md">
            <CardHeader>
                <CardTitle>Kecakapan Khusus Siswa</CardTitle>
                <CardDescription>Berikut adalah kecakapan khusus siswa.</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="aspect-square">
                    <ResponsiveContainer width="100%" height="100%">
                        <ChartContainer config={chartConfig} className="h-full w-full p-2.5">
                            <RadarChart data={chartData}>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />

                                <Radar
                                    name="Nilai TKK Siswa"
                                    dataKey="tkk_siswa"
                                    stroke="#4f46e5"
                                    fill="#4f46e5"
                                    fillOpacity={0.6}
                                    dot={{
                                        r: 4,
                                        fillOpacity: 1,
                                    }}
                                />
                                <Radar name="Nilai TKK Pramuka" dataKey="tkk_pramuka" fill="#8F85F3" fillOpacity={0.4} />
                            </RadarChart>
                        </ChartContainer>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Total TKK Siswa: {siswa?.tanda_kecakapan_khusus?.length ?? 0} dari {tandaKecakapanKhusus.length ?? 0} TKK Pramuka
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    Progress: {((siswa?.tanda_kecakapan_khusus?.length / tandaKecakapanKhusus?.length) * 100).toFixed(1)}%
                </div>
            </CardFooter>
        </Card>
    );
}
