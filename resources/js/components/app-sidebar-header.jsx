import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { HomeIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [] }) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/" className="flex items-center gap-2">
                        <HomeIcon className="h-4 w-4" />
                        <span>Home</span>
                    </Link>
                </Button>
            </div>
        </header>
    );
}
