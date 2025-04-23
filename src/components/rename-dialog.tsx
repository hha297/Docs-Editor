'use client';

import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
} from '@/components/ui/dialog';
import { Id } from '../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface RenameDialogProps {
        documentId: Id<'documents'>;
        initialTitle: string;
        children: React.ReactNode;
}

export const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {
        const update = useMutation(api.documents.updateById);
        const [isUpdating, setIsUpdating] = useState(false);

        const [title, setTitle] = useState(initialTitle || '');
        const [open, setOpen] = useState(false);

        const onSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setIsUpdating(true);
                update({ documentId, title: title.trim() || 'Untitled Document' }).finally(() => {
                        toast.success('Document renamed!');
                        setIsUpdating(false);
                        setOpen(false);
                });
        };

        return (
                <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>{children}</DialogTrigger>
                        <DialogContent onClick={(e) => e.stopPropagation()}>
                                <form onSubmit={onSubmit}>
                                        <DialogHeader>
                                                <DialogTitle>Rename document</DialogTitle>
                                                <DialogDescription>
                                                        Enter a new name for the document.
                                                </DialogDescription>
                                        </DialogHeader>
                                        <div className="my-4">
                                                <Input
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        placeholder="Document name"
                                                        onClick={(e) => e.stopPropagation()}
                                                />
                                        </div>
                                        <DialogFooter>
                                                <Button
                                                        type="button"
                                                        variant={'ghost'}
                                                        disabled={isUpdating}
                                                        onClick={(e) => {
                                                                setOpen(false);
                                                                e.stopPropagation();
                                                        }}
                                                >
                                                        Cancel
                                                </Button>
                                                <Button
                                                        type="submit"
                                                        disabled={isUpdating}
                                                        onClick={(e) => e.stopPropagation()}
                                                >
                                                        Save
                                                </Button>
                                        </DialogFooter>
                                </form>
                        </DialogContent>
                </Dialog>
        );
};
