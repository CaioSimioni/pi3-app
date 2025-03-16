import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Medications',
        href: '/medications',
    },
];

export default function Medications() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Medications" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <HeadingSmall title="Medications" description="Under construction..." />
            </div>
        </AppLayout>
    );
}
