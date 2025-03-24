import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserRound } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { patientsNumber } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
                <Card>
                    <CardHeader className='flex-row justify-between'>Patients <UserRound /></CardHeader>
                    <CardContent className='font-bold'>{patientsNumber}</CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex-row justify-between'>Patients <UserRound /></CardHeader>
                    <CardContent className='font-bold'>{patientsNumber}</CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex-row justify-between'>Patients <UserRound /></CardHeader>
                    <CardContent className='font-bold'>{patientsNumber}</CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
