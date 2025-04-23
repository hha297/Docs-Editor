import React from 'react';
import { Doc } from '../../../convex/_generated/dataModel';
import { PaginationStatus } from 'convex/react';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2Icon } from 'lucide-react';
import { DocumentRow } from './document-row';
import { Button } from '@/components/ui/button';
interface DocumentsTableProps {
        documents: Doc<'documents'>[] | undefined;
        status: PaginationStatus;
        loadMore: (numItems: number) => void;
}

export const DocumentsTable = ({ documents, status, loadMore }: DocumentsTableProps) => {
        return (
                <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-4">
                        {documents === undefined ? (
                                <div className="flex items-center justify-center h-24 text-gray-500">
                                        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                                </div>
                        ) : (
                                <Table className="w-full">
                                        <TableHeader>
                                                <TableRow className="hover:bg-transparent border-none">
                                                        <TableHead>Title</TableHead>
                                                        <TableHead>&nbsp;</TableHead>
                                                        <TableHead className="hidden md:table-cell">Shared</TableHead>
                                                        <TableHead className="hidden md:table-cell">
                                                                Created At
                                                        </TableHead>
                                                </TableRow>
                                        </TableHeader>
                                        {/* use tableBody */}
                                        {documents.length === 0 ? (
                                                <TableBody>
                                                        <TableRow className="hover:bg-transparent border-none">
                                                                <TableCell
                                                                        colSpan={4}
                                                                        className=" h-24 text-muted-foreground text-center"
                                                                >
                                                                        No documents found.
                                                                </TableCell>
                                                        </TableRow>
                                                </TableBody>
                                        ) : (
                                                <TableBody>
                                                        {documents.map((document) => (
                                                                <DocumentRow key={document._id} document={document} />
                                                        ))}
                                                </TableBody>
                                        )}
                                </Table>
                        )}
                        <div className="flex items-center justify-center">
                                <Button
                                        variant={'ghost'}
                                        onClick={() => loadMore(5)}
                                        disabled={status !== 'CanLoadMore'}
                                >
                                        {status === 'CanLoadMore' ? 'Load more' : 'End of results'}
                                </Button>
                        </div>
                </div>
        );
};
