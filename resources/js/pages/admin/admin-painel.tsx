import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type NavItem, type SharedData } from '@/types';
import BasicLayout from '@/layouts/basic-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Painel',
        href: '/admin',
    },
];

const sidebarNavItems: NavItem[] = [
    {
        title: 'General',
        href: '/admin',
        icon: null,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: null,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />
            <BasicLayout sidebarNavItems={sidebarNavItems}>
                <div className="space-y-6">
                    <h1><strong>{auth.user.name}</strong> is an administrator</h1>
                </div>
            </BasicLayout>
        </AppLayout>
    );
}
