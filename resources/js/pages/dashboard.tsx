/* import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'; */
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1>Welcome to Hospital Management!</h1>
                <div>
                    <p>Name: {auth.user.name}</p>
                    <p>Email: {auth.user.email}</p>
                    <p>Role: {auth.user.role}</p>
                </div>
            </div>
        </AppLayout>
    );
}
