import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { type NavItem, type User } from '@/types';
import BasicLayout from '@/layouts/basic-layout';
import HeadingSmall from '@/components/heading-small';
import { type PropsWithChildren, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toaster";
import { Checkbox } from "@/components/ui/checkbox";
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';

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

const roleTranslations: { [key: string]: string } = {
    adm: "Administrator",
    aux: "Assistant",
    far: "Pharmacist",
    med: "Doctor",
    chef: "Head Nurse",
    enf: "Nurse",
};

export default function Users({ users }: PropsWithChildren<{ users: User[] }>) {
    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '' as string | undefined,
        password_confirmation: '' as string | undefined,
        role: 'adm',
    });

    const handleCreateUser = () => {
        post(route('user.create'), {
            onSuccess: () => {
                reset();
                setDialogOpen(false);
                setToastVisible(true);
            },
        });
    };

    const handleEditUser = () => {

        if (!resetPassword) {
            delete data.password;
            delete data.password_confirmation;
        }

        patch(route('user.update', { id: selectedUser!.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditDialogOpen(false);
                setToastVisible(true);
            },
        });

    };

    const handleDeleteUser = (userId: number) => {
        destroy(route('user.destroy', { id: userId }), {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setToastVisible(true);
            },
        });
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [resetPassword, setResetPassword] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            setData({
                name: selectedUser.name,
                email: selectedUser.email,
                role: selectedUser.role,
                password: resetPassword ? data.password : '',
                password_confirmation: resetPassword ? data.password_confirmation : '',
            });
        }
    }, [selectedUser, resetPassword]);

    return (
        <ToastProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Admin" />
                <BasicLayout sidebarNavItems={sidebarNavItems}>
                    <div className="space-y-6">
                        <HeadingSmall title="Users informations" description="Create, Update or Delete users from application" />

                        {toastVisible && (
                            <Toast className={toastVisible ? "bg-green-500" : ""} onOpenChange={setToastVisible} open={toastVisible}>
                                <ToastTitle>Success</ToastTitle>
                                <ToastDescription>Action completed successfully.</ToastDescription>
                            </Toast>
                        )}

                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setDialogOpen(true)}>Create New User <CirclePlus /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New User</DialogTitle>
                                    <DialogDescription>Fill in the details below to create a new user.</DialogDescription>
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
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.password && <span>{errors.password}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            disabled={processing}
                                        />
                                        {errors.password_confirmation && <span>{errors.password_confirmation}</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="role">Role</Label>
                                        <Select value={data.role} onValueChange={(value) => setData('role', value)} disabled={processing}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(roleTranslations).map((role) => (
                                                    <SelectItem key={role} value={role}>
                                                        {roleTranslations[role]}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.role && <span>{errors.role}</span>}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleCreateUser} disabled={processing}>
                                        {processing ? 'Creating...' : 'Create'}
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead className="text-center">Name</TableHead>
                                    <TableHead className="text-center">Email</TableHead>
                                    <TableHead className="text-center">Role</TableHead>
                                    <TableHead className="text-center">Created At</TableHead>
                                    <TableHead className="text-center">Updated At</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{user.id}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{user.name}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{user.email}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{roleTranslations[user.role]}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{new Date(user.created_at).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{new Date(user.updated_at).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">
                                            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="mr-2" size="sm" onClick={() => {
                                                        setSelectedUser(user);
                                                        setEditDialogOpen(true);
                                                    }}>Edit<Pencil />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit User</DialogTitle>
                                                        <DialogDescription>Update the details below to edit the user.</DialogDescription>
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
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id="reset_password"
                                                                checked={resetPassword}
                                                                onCheckedChange={(checked) => setResetPassword(checked === true)}
                                                                disabled={processing}
                                                            />
                                                            <Label htmlFor="reset_password">Reset Password</Label>
                                                        </div>
                                                        {resetPassword && (
                                                            <>
                                                                <div>
                                                                    <Label htmlFor="password">Password</Label>
                                                                    <Input
                                                                        id="password"
                                                                        type="password"
                                                                        value={data.password}
                                                                        onChange={(e) => setData('password', e.target.value)}
                                                                        disabled={processing}
                                                                    />
                                                                    {errors.password && <span>{errors.password}</span>}
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                                                    <Input
                                                                        id="password_confirmation"
                                                                        type="password"
                                                                        value={data.password_confirmation}
                                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                                        disabled={processing}
                                                                    />
                                                                    {errors.password_confirmation && <span>{errors.password_confirmation}</span>}
                                                                </div>
                                                            </>
                                                        )}
                                                        <div>
                                                            <Label htmlFor="role">Role</Label>
                                                            <Select value={data.role} onValueChange={(value) => setData('role', value)} disabled={processing}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a role" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {Object.keys(roleTranslations).map((role) => (
                                                                        <SelectItem key={role} value={role}>
                                                                            {roleTranslations[role]}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.role && <span>{errors.role}</span>}
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button onClick={handleEditUser} disabled={processing}>
                                                            {processing ? 'Updating...' : 'Update'}
                                                        </Button>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="destructive" size="sm" onClick={() => { setSelectedUser(user); setDeleteDialogOpen(true); }}>Delete <Trash2 /></Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Confirm Deletion</DialogTitle>
                                                        <DialogDescription>Are you sure you want to delete the user <strong>{selectedUser?.name}</strong>?</DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="destructive" onClick={() => handleDeleteUser(selectedUser!.id)}>Delete</Button>
                                                        <DialogClose asChild>
                                                            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </BasicLayout>
            </AppLayout>
            <ToastViewport />
        </ToastProvider>
    );
}
