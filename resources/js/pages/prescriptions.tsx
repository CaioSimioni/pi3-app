import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Prescriptions',
        href: '/prescriptions',
    },
];

export default function Prescriptions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Prescriptions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <HeadingSmall title="Prescriptions" description="Under construction..." />
            </div>
        </AppLayout>
    );
}
