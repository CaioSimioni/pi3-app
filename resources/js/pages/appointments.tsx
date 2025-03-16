import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appointments',
        href: '/appointments',
    },
];

export default function Appointments() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appointments" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <HeadingSmall title="Appointments" description="Under construction..." />
            </div>
        </AppLayout>
    );
}
