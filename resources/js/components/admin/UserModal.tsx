import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_admin: boolean;
}

interface UserModalProps {
    open: boolean;
    user: User;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    isEditing?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ open, user, onClose, onChange, onSubmit, isEditing = false }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name="name" value={user.name} onChange={onChange} required />
                        </div>
                        <div>
                            <Label htmlFor="email">Correo</Label>
                            <Input id="email" name="email" type="email" value={user.email} onChange={onChange} required />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">{isEditing ? 'Actualizar' : 'Guardar'}</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserModal;
