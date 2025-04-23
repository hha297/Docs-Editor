import React from 'react';
import { Id } from '../../../convex/_generated/dataModel';
import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon, FilePenIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { DeleteDialog } from '@/components/delete-dialog';
import { RenameDialog } from '@/components/rename-dialog';

interface DocumentMenuProps {
        documentId: Id<'documents'>;
        title: string;
        onNewTab: (id: Id<'documents'>) => void;
}
export const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <Button variant={'ghost'} size={'icon'} className="rounded-full">
                                        <MoreVerticalIcon className="size-4" />
                                </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => onNewTab(documentId)}>
                                        <ExternalLinkIcon className="size-4" /> Open in new tab
                                </DropdownMenuItem>
                                <RenameDialog documentId={documentId} initialTitle={title}>
                                        <DropdownMenuItem
                                                onSelect={(e) => e.preventDefault()}
                                                onClick={(e) => e.stopPropagation()}
                                        >
                                                <FilePenIcon className="size-4" /> Rename
                                        </DropdownMenuItem>
                                </RenameDialog>

                                <DeleteDialog documentId={documentId}>
                                        <DropdownMenuItem
                                                onSelect={(e) => e.preventDefault()}
                                                onClick={(e) => e.stopPropagation()}
                                        >
                                                <TrashIcon className="size-4" /> Delete
                                        </DropdownMenuItem>
                                </DeleteDialog>
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};
