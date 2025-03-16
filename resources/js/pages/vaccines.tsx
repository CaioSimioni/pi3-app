import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vaccines',
        href: '/vaccines',
    },
];

export default function Vaccines() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vaccines" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <HeadingSmall title="Vaccines" description="Under construction..." />
            </div>
        </AppLayout>
    );
}
