import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, UserRound, CalendarDays, ReceiptText, Stethoscope, Syringe, Pill, ClipboardPen, UsersRound, Shield, FileText, Warehouse, HeartPulse } from 'lucide-react';
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
        title: 'Electronic Health Records',
        href: '/ehr',
        icon: FileText,
    },
    {
        title: 'Medical Staff',
        href: '/staff',
        icon: UsersRound,
    },
    {
        title: 'Billing',
        href: '/billing',
        icon: ReceiptText,
    },
    {
        title: 'Inventory & Pharmacy',
        href: '/inventory',
        icon: Warehouse,
    },
    {
        title: 'Exams & Lab Tests',
        href: '/exams',
        icon: Stethoscope,
    },
    {
        title: 'Emergency & ICU',
        href: '/emergency',
        icon: HeartPulse,
    },
    {
        title: 'Reports & Analytics',
        href: '/reports',
        icon: ClipboardPen,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Admin Panel',
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
