import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Exams',
        href: '/exams',
    },
];

export default function Exams() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exams" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <HeadingSmall title="Exams" description="Under construction..." />
            </div>
        </AppLayout>
    );
}
