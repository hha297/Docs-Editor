'use client';

import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Id } from '../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DeleteDialogProps {
        documentId: Id<'documents'>;
        children: React.ReactNode;
}

export const DeleteDialog = ({ documentId, children }: DeleteDialogProps) => {
        const router = useRouter();
        const remove = useMutation(api.documents.deleteById);
        const [isDeleting, setIsDeleting] = useState(false);

        return (
                <AlertDialog>
                        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the document.
                                        </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                                                Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                                disabled={isDeleting}
                                                onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsDeleting(true);
                                                        remove({ documentId })
                                                                .then(() => {
                                                                        toast.success('Document deleted!');

                                                                        router.push('/');
                                                                })
                                                                .catch(() => {
                                                                        toast.error('Failed to delete document');
                                                                })
                                                                .finally(() => {
                                                                        setIsDeleting(false);
                                                                });
                                                }}
                                        >
                                                Delete
                                        </AlertDialogAction>
                                </AlertDialogFooter>
                        </AlertDialogContent>
                </AlertDialog>
        );
};
