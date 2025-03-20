import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { type NavItem } from '@/types';
import BasicLayout from '@/layouts/basic-layout';
import HeadingSmall from '@/components/heading-small';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toaster";
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Patients Painel',
        href: '/patients',
    },
];

const sidebarNavItems: NavItem[] = [
    {
        title: 'General',
        href: '/patients',
        icon: null,
    },
];

interface Patient {
    id: number;
    name: string;
    cpf: string;
    birth_date: string;
    phone?: string;
    email?: string;
    address?: string;
    insurance?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export default function Patients({ patients }: { patients: Patient[] }) {
    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        cpf: '',
        birth_date: '',
        phone: '',
        email: '',
        address: '',
        insurance: 'Nenhum',
        is_active: true as boolean,
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const handleCreatePatient = () => {
        post(route('patients.store'), {
            onSuccess: () => {
                reset();
                setDialogOpen(false);
                setToastVisible(true);
            },
        });
    };

    const handleEditPatient = () => {
        patch(route('patients.update', { patient: selectedPatient!.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditDialogOpen(false);
                setToastVisible(true);
            },
        });
    };

    const handleDeletePatient = (patientId: number) => {
        destroy(route('patients.destroy', { patient: patientId }), {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setToastVisible(true);
            },
        });
    };

    useEffect(() => {
        if (selectedPatient) {
            setData({
                name: selectedPatient.name,
                cpf: selectedPatient.cpf,
                birth_date: new Date(selectedPatient.birth_date).toISOString().split('T')[0], // Format date for input
                phone: selectedPatient.phone || '',
                email: selectedPatient.email || '',
                address: selectedPatient.address || '',
                insurance: selectedPatient.insurance || 'Nenhum',
                is_active: selectedPatient.is_active,
            });
        }
    }, [selectedPatient]);

    return (
        <ToastProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Patients" />
                <BasicLayout sidebarNavItems={sidebarNavItems}>
                    <div className="space-y-6">
                        <HeadingSmall title="Patients informations" description="Create, Update or Delete patients from application" />

                        {toastVisible && (
                            <Toast className={toastVisible ? "bg-green-500" : ""} onOpenChange={setToastVisible} open={toastVisible}>
                                <ToastTitle>Success</ToastTitle>
                                <ToastDescription>Action completed successfully.</ToastDescription>
                            </Toast>
                        )}

                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setDialogOpen(true)}>Create New Patient <CirclePlus /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Patient</DialogTitle>
                                    <DialogDescription>Fill in the details below to create a new patient.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.name && <span>{errors.name}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input
                                            id="cpf"
                                            type="text"
                                            value={data.cpf}
                                            onChange={(e) => setData('cpf', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.cpf && <span>{errors.cpf}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="birth_date">Birth Date</Label>
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            value={data.birth_date}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.birth_date && <span>{errors.birth_date}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.phone && <span>{errors.phone}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.email && <span>{errors.email}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.address && <span>{errors.address}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="insurance">Insurance</Label>
                                        <Select
                                            value={data.insurance}
                                            onValueChange={(value) => setData('insurance', value)}
                                            disabled={processing}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an insurance" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Nenhum">Nenhum</SelectItem>
                                                <SelectItem value="São Francisco">São Francisco</SelectItem>
                                                <SelectItem value="Unimed">Unimed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.insurance && <span>{errors.insurance}</span>}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleCreatePatient} disabled={processing}>
                                        {processing ? 'Creating...' : 'Create'}
                                        <CirclePlus />
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Table className="w-max">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">ID</TableHead>
                                    <TableHead className="text-center">Name</TableHead>
                                    <TableHead className="text-center">CPF</TableHead>
                                    <TableHead className="text-center">Birth Date</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell>{patient.id}</TableCell>
                                        <TableCell>{patient.name}</TableCell>
                                        <TableCell>{patient.cpf}</TableCell>
                                        <TableCell>{new Date(patient.birth_date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                className="mr-2"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedPatient(patient);
                                                    setEditDialogOpen(true);
                                                }}>
                                                Edit
                                                <Pencil />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="mr-2"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedPatient(patient);
                                                    setDeleteDialogOpen(true);
                                                }}>
                                                Delete
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </BasicLayout>
            </AppLayout>
            <ToastViewport />
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Patient</DialogTitle>
                        <DialogDescription>Update the details below to edit the patient.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                            />
                            {errors.name && <span>{errors.name}</span>}
                        </div>
                        <div>
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                id="cpf"
                                type="text"
                                value={data.cpf}
                                onChange={(e) => setData('cpf', e.target.value)}
                                disabled={processing}
                            />
                            {errors.cpf && <span>{errors.cpf}</span>}
                        </div>
                        <div>
                            <Label htmlFor="birth_date">Birth Date</Label>
                            <Input
                                id="birth_date"
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                disabled={processing}
                            />
                            {errors.birth_date && <span>{errors.birth_date}</span>}
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                            />
                            {errors.phone && <span>{errors.phone}</span>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                            />
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                disabled={processing}
                            />
                            {errors.address && <span>{errors.address}</span>}
                        </div>
                        <div>
                            <Label htmlFor="insurance">Insurance</Label>
                            <Select
                                value={data.insurance}
                                onValueChange={(value) => setData('insurance', value)}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an insurance" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Nenhum">Nenhum</SelectItem>
                                    <SelectItem value="São Francisco">São Francisco</SelectItem>
                                    <SelectItem value="Unimed">Unimed</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.insurance && <span>{errors.insurance}</span>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleEditPatient} disabled={processing}>
                            {processing ? 'Updating...' : 'Update'}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>Are you sure you want to delete the patient <strong>{selectedPatient?.name}</strong>?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={() => handleDeletePatient(selectedPatient!.id)}>Delete</Button>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ToastProvider>
    );
}
