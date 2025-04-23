import { Doc } from '../../../convex/_generated/dataModel';
import { TableRow, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { SiGoogledocs } from 'react-icons/si';

import { DocumentMenu } from './document-menu';
import { useRouter } from 'next/navigation';
interface DocumentRowProps {
        document: Doc<'documents'>;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
        const router = useRouter();

        return (
                <TableRow
                        className="hover:bg-transparent border-none cursor-pointer"
                        onClick={() => router.push(`/documents/${document._id}`)}
                >
                        <TableCell className="text-muted-foreground">
                                <SiGoogledocs className="size-4 fill-blue-600" />
                        </TableCell>
                        <TableCell className="font-medium md:w-1/2"> {document.title}</TableCell>
                        <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                                {document.organizationId ? (
                                        <Building2Icon className="size-4 " />
                                ) : (
                                        <CircleUserIcon className="size-4 text-blue-500" />
                                )}
                                {document.organizationId ? 'Organization' : 'Personal'}
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden md:table-cell">
                                {format(new Date(document._creationTime), 'dd MMMM, yyyy')}
                        </TableCell>
                        {/* More action */}
                        <TableCell className="flex justify-end">
                                <DocumentMenu
                                        documentId={document._id}
                                        title={document.title}
                                        onNewTab={() => window.open(`/documents/${document._id}`, '_blank')}
                                />
                        </TableCell>
                </TableRow>
        );
};
