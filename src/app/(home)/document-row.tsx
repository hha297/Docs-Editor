import { Button } from '@/components/ui/button';
import { Doc } from '../../../convex/_generated/dataModel';
import { TableRow, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Building2Icon, CircleUserIcon, MoreVerticalIcon } from 'lucide-react';
import { SiGoogledocs } from 'react-icons/si';
interface DocumentRowProps {
        document: Doc<'documents'>;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
        // import and use shadcn/ui table row, cell

        return (
                <TableRow className="hover:bg-transparent border-none cursor-pointer">
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
                                <Button variant="ghost" className="size-4 hover:bg-transparent rounded-full">
                                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                                </Button>
                        </TableCell>
                </TableRow>
        );
};
