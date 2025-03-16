import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, UserRound, CalendarDays, ReceiptText, Stethoscope, Syringe, Pill, ClipboardPen, UsersRound, Shield } from 'lucide-react';
import AppLogo from './app-logo';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Patients',
        href: '/patients',
        icon: UserRound,
    },
    {
        title: 'Appointments',
        href: '/appointments',
        icon: CalendarDays,
    },
    {
        title: 'Prescriptions',
        href: '/prescriptions',
        icon: ReceiptText,
    },
    {
        title: 'Exams',
        href: '/exams',
        icon: Stethoscope,
    },
    {
        title: 'Vaccines',
        href: '/vaccines',
        icon: Syringe,
    },
    {
        title: 'Medications',
        href: '/medications',
        icon: Pill,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: ClipboardPen,
    },
    {
        title: 'Employees',
        href: '/employees',
        icon: UsersRound,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Administrador Painel',
        href: '/admin',
        icon: Shield,
    }
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {auth.user.role === 'adm' && (
                    <NavFooter items={footerNavItems} className="mt-auto" />
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
