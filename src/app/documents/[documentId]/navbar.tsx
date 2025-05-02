'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DocumentInput } from './document-input';
import {
        Menubar,
        MenubarMenu,
        MenubarTrigger,
        MenubarContent,
        MenubarItem,
        MenubarSeparator,
        MenubarSub,
        MenubarSubTrigger,
        MenubarSubContent,
        MenubarShortcut,
} from '@/components/ui/menubar';

import {
        FileJsonIcon,
        FilePenIcon,
        FilePlusIcon,
        FileTextIcon,
        FolderOpenIcon,
        GlobeIcon,
        PrinterIcon,
        SaveIcon,
        Trash2Icon,
        Undo2Icon,
        Redo2Icon,
        ScissorsIcon,
        CopyIcon,
        ClipboardPasteIcon,
        SearchIcon,
        LayoutDashboardIcon,
        RulerIcon,
        SigmaIcon,
        Maximize2Icon,
        ImageIcon,
        TableIcon,
        PencilRulerIcon,
        BarChart2Icon,
        LinkIcon,
        MessageCircleIcon,
        SmileIcon,
        SpellCheckIcon,
        ListOrderedIcon,
        FileDiffIcon,
        MicIcon,
        PuzzleIcon,
        Code2Icon,
        HelpCircleIcon,
        GraduationCapIcon,
        RefreshCcwIcon,
        BugIcon,
        TextIcon,
        HeadingIcon,
        AlignCenterIcon,
        ListEndIcon,
        ColumnsIcon,
        ListIcon,
        BoldIcon,
        ItalicIcon,
        UnderlineIcon,
        StrikethroughIcon,
        RemoveFormattingIcon,
} from 'lucide-react';

import { BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '@/store/use-editor-store';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Avatars } from './avatars';
import { Inbox } from './inbox';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';
import { RenameDialog } from '@/components/rename-dialog';
import { DeleteDialog } from '@/components/delete-dialog';

interface NavbarProps {
        data: Doc<'documents'>;
}
export const Navbar = ({ data }: NavbarProps) => {
        const { editor } = useEditorStore();
        const router = useRouter();
        const mutate = useMutation(api.documents.create);

        const onNewDocument = () => {
                mutate({ title: 'Untitled Document', initialContent: '' })
                        .catch(() => {
                                toast.error('Failed to create document');
                        })
                        .then((documentId) => {
                                toast.success('Document created');
                                router.push(`/documents/${documentId}`);
                        });
        };
        const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
                editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
        };

        const onDownload = (blob: Blob, fileName: string) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
                URL.revokeObjectURL(url);
        };

        const onSaveAsJson = () => {
                if (!editor) return;
                const json = editor.getJSON();
                const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
                onDownload(blob, `${data.title || 'Untitled Document'}.json`);
        };

        const onSaveAsHTML = () => {
                if (!editor) return;
                const html = editor.getHTML();
                const blob = new Blob([html], { type: 'text/html' });
                onDownload(blob, `${data.title || 'Untitled Document'}.html`);
        };

        //TODO: Save as PDF Func

        const onSaveAsText = () => {
                if (!editor) return;
                const text = editor.getText();
                const blob = new Blob([text], { type: 'text/plain' });
                onDownload(blob, `${data.title || 'Untitled Document'}.txt`);
        };

        return (
                <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                                <Link href="/">
                                        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
                                </Link>
                                <div className="flex flex-col">
                                        <DocumentInput title={data.title || 'Untitled Document'} id={data._id} />
                                        <div className="flex ">
                                                <Menubar className="border-none bg-transparent shadow-none h-auto p-0 text-sm">
                                                        {/* File */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>File</MenubarTrigger>
                                                                <MenubarContent className="print:hidden">
                                                                        <MenubarSub>
                                                                                <MenubarSubTrigger>
                                                                                        <SaveIcon className="size-4 mr-2" />
                                                                                        Save
                                                                                </MenubarSubTrigger>
                                                                                <MenubarSubContent>
                                                                                        <MenubarItem
                                                                                                onClick={onSaveAsJson}
                                                                                        >
                                                                                                <FileJsonIcon className="size-4 mr-2" />
                                                                                                Save as JSON
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={onSaveAsHTML}
                                                                                        >
                                                                                                <GlobeIcon className="size-4 mr-2" />
                                                                                                Save as HTML
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        window.print()
                                                                                                }
                                                                                        >
                                                                                                <BsFilePdf className="size-4 mr-2" />
                                                                                                Save as PDF
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={onSaveAsText}
                                                                                        >
                                                                                                <FileTextIcon className="size-4 mr-2" />
                                                                                                Save as Text
                                                                                        </MenubarItem>
                                                                                </MenubarSubContent>
                                                                        </MenubarSub>
                                                                        <MenubarItem onClick={onNewDocument}>
                                                                                <FilePlusIcon className="size-4 mr-2" />
                                                                                New Document
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <FolderOpenIcon className="size-4 mr-2" />
                                                                                Open Document
                                                                        </MenubarItem>

                                                                        <MenubarSeparator />

                                                                        <RenameDialog
                                                                                documentId={data._id}
                                                                                initialTitle={data.title}
                                                                        >
                                                                                <MenubarItem
                                                                                        onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                        }}
                                                                                        onSelect={(e) =>
                                                                                                e.preventDefault()
                                                                                        }
                                                                                >
                                                                                        <FilePenIcon className="size-4 mr-2" />
                                                                                        Rename
                                                                                </MenubarItem>
                                                                        </RenameDialog>

                                                                        <DeleteDialog documentId={data._id}>
                                                                                <MenubarItem
                                                                                        onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                        }}
                                                                                        onSelect={(e) =>
                                                                                                e.preventDefault()
                                                                                        }
                                                                                >
                                                                                        <Trash2Icon className="size-4 mr-2" />
                                                                                        Move to trash
                                                                                </MenubarItem>
                                                                        </DeleteDialog>

                                                                        <MenubarSeparator />
                                                                        <MenubarItem onClick={() => window.print()}>
                                                                                <PrinterIcon className="size-4 mr-2" />
                                                                                Print{' '}
                                                                                <MenubarShortcut>
                                                                                        Ctrl+P
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>

                                                        {/* Edit */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>Edit</MenubarTrigger>
                                                                <MenubarContent>
                                                                        <MenubarItem
                                                                                onClick={() =>
                                                                                        editor
                                                                                                ?.chain()
                                                                                                .focus()
                                                                                                .undo()
                                                                                                .run()
                                                                                }
                                                                        >
                                                                                <Undo2Icon className="size-4 mr-2" />
                                                                                Undo
                                                                                <MenubarShortcut>
                                                                                        Ctrl+Z
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                        <MenubarItem
                                                                                onClick={() =>
                                                                                        editor
                                                                                                ?.chain()
                                                                                                .focus()
                                                                                                .redo()
                                                                                                .run()
                                                                                }
                                                                        >
                                                                                <Redo2Icon className="size-4 mr-2" />
                                                                                Redo
                                                                                <MenubarShortcut>
                                                                                        Ctrl+Y
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                        <MenubarSeparator />
                                                                        <MenubarItem>
                                                                                <ScissorsIcon className="size-4 mr-2" />
                                                                                Cut
                                                                                <MenubarShortcut>
                                                                                        Ctrl+X
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <CopyIcon className="size-4 mr-2" />
                                                                                Copy
                                                                                <MenubarShortcut>
                                                                                        Ctrl+C
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <ClipboardPasteIcon className="size-4 mr-2" />
                                                                                Paste
                                                                                <MenubarShortcut>
                                                                                        Ctrl+V
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <LayoutDashboardIcon className="size-4 mr-2" />
                                                                                Select all
                                                                                <MenubarShortcut>
                                                                                        Ctrl+A
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <SearchIcon className="size-4 mr-2" />
                                                                                Find and replace
                                                                                <MenubarShortcut>
                                                                                        Ctrl+F
                                                                                </MenubarShortcut>
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>

                                                        {/* View */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>View</MenubarTrigger>
                                                                <MenubarContent>
                                                                        <MenubarItem>
                                                                                <LayoutDashboardIcon className="size-4 mr-2" />
                                                                                Mode
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <RulerIcon className="size-4 mr-2" />
                                                                                Show ruler
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <SigmaIcon className="size-4 mr-2" />
                                                                                Show equation toolbar
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <Maximize2Icon className="size-4 mr-2" />
                                                                                Full screen
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>

                                                        {/* Insert */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>Insert</MenubarTrigger>
                                                                <MenubarContent>
                                                                        <MenubarItem>
                                                                                <ImageIcon className="size-4 mr-2" />
                                                                                Image
                                                                        </MenubarItem>
                                                                        <MenubarSub>
                                                                                <MenubarSubTrigger>
                                                                                        <TableIcon className="size-4 mr-2" />
                                                                                        Table
                                                                                </MenubarSubTrigger>
                                                                                <MenubarSubContent>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        insertTable({
                                                                                                                rows: 1,
                                                                                                                cols: 1,
                                                                                                        })
                                                                                                }
                                                                                        >
                                                                                                {' '}
                                                                                                1x1
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        insertTable({
                                                                                                                rows: 2,
                                                                                                                cols: 2,
                                                                                                        })
                                                                                                }
                                                                                        >
                                                                                                {' '}
                                                                                                2x2
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        insertTable({
                                                                                                                rows: 3,
                                                                                                                cols: 3,
                                                                                                        })
                                                                                                }
                                                                                        >
                                                                                                {' '}
                                                                                                3x3
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        insertTable({
                                                                                                                rows: 4,
                                                                                                                cols: 4,
                                                                                                        })
                                                                                                }
                                                                                        >
                                                                                                {' '}
                                                                                                4x4
                                                                                        </MenubarItem>
                                                                                </MenubarSubContent>
                                                                        </MenubarSub>
                                                                        <MenubarItem>
                                                                                <PencilRulerIcon className="size-4 mr-2" />
                                                                                Drawing
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <BarChart2Icon className="size-4 mr-2" />
                                                                                Chart
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <LinkIcon className="size-4 mr-2" />
                                                                                Link
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <MessageCircleIcon className="size-4 mr-2" />
                                                                                Comment
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <SmileIcon className="size-4 mr-2" />
                                                                                Emoji
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>
                                                        {/* Format */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>Format</MenubarTrigger>
                                                                <MenubarContent>
                                                                        <MenubarSub>
                                                                                <MenubarSubTrigger>
                                                                                        <TextIcon className="size-4 mr-2" />
                                                                                        Text
                                                                                </MenubarSubTrigger>
                                                                                <MenubarSubContent>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        editor
                                                                                                                ?.chain()
                                                                                                                .focus()
                                                                                                                .toggleBold()
                                                                                                                .run()
                                                                                                }
                                                                                        >
                                                                                                <BoldIcon className="size-4 mr-2" />
                                                                                                Bold
                                                                                                <MenubarShortcut>
                                                                                                        Ctrl+B
                                                                                                </MenubarShortcut>
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        editor
                                                                                                                ?.chain()
                                                                                                                .focus()
                                                                                                                .toggleItalic()
                                                                                                                .run()
                                                                                                }
                                                                                        >
                                                                                                <ItalicIcon className="size-4 mr-2" />
                                                                                                Italic
                                                                                                <MenubarShortcut>
                                                                                                        Ctrl+I
                                                                                                </MenubarShortcut>
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        editor
                                                                                                                ?.chain()
                                                                                                                .focus()
                                                                                                                .toggleUnderline()
                                                                                                                .run()
                                                                                                }
                                                                                        >
                                                                                                <UnderlineIcon className="size-4 mr-2" />
                                                                                                Underline
                                                                                                <MenubarShortcut>
                                                                                                        Ctrl+U
                                                                                                </MenubarShortcut>
                                                                                        </MenubarItem>
                                                                                        <MenubarItem
                                                                                                onClick={() =>
                                                                                                        editor
                                                                                                                ?.chain()
                                                                                                                .focus()
                                                                                                                .toggleStrike()
                                                                                                                .run()
                                                                                                }
                                                                                        >
                                                                                                <StrikethroughIcon className="size-4 mr-2" />
                                                                                                Strikethrough
                                                                                                <MenubarShortcut className="ml-2">
                                                                                                        Ctrl+⇧+X
                                                                                                </MenubarShortcut>
                                                                                        </MenubarItem>
                                                                                </MenubarSubContent>
                                                                        </MenubarSub>
                                                                        <MenubarItem>
                                                                                <HeadingIcon className="size-4 mr-2" />
                                                                                Paragraph styles
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <AlignCenterIcon className="size-4 mr-2" />
                                                                                Align & Indent
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <ListEndIcon className="size-4 mr-2" />
                                                                                Line spacing
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <ColumnsIcon className="size-4 mr-2" />
                                                                                Columns
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <ListIcon className="size-4 mr-2" />
                                                                                Bullets & numbering
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <HeadingIcon className="size-4 mr-2" />
                                                                                Headers & footers
                                                                        </MenubarItem>
                                                                        <MenubarItem
                                                                                onClick={() =>
                                                                                        editor
                                                                                                ?.chain()
                                                                                                .focus()
                                                                                                .unsetAllMarks()
                                                                                                .run()
                                                                                }
                                                                        >
                                                                                <RemoveFormattingIcon className="size-4 mr-2" />
                                                                                Clear formatting
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>

                                                        {/* Tools */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>Tools</MenubarTrigger>
                                                                <MenubarContent>
                                                                        <MenubarItem>
                                                                                <SpellCheckIcon className="size-4 mr-2" />
                                                                                Spelling & grammar
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <ListOrderedIcon className="size-4 mr-2" />
                                                                                Word count
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <FileDiffIcon className="size-4 mr-2" />
                                                                                Compare documents
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <MicIcon className="size-4 mr-2" />
                                                                                Voice typing
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>

                                                        {/* Extensions */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>Extensions</MenubarTrigger>
                                                                <MenubarContent>
                                                                        <MenubarItem>
                                                                                <PuzzleIcon className="size-4 mr-2" />
                                                                                Add-ons
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <Code2Icon className="size-4 mr-2" />
                                                                                Apps Script
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>

                                                        {/* Help */}
                                                        <MenubarMenu>
                                                                <MenubarTrigger>Help</MenubarTrigger>
                                                                <MenubarContent>
                                                                        <MenubarItem>
                                                                                <HelpCircleIcon className="size-4 mr-2" />
                                                                                Help
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <GraduationCapIcon className="size-4 mr-2" />
                                                                                Training
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <RefreshCcwIcon className="size-4 mr-2" />
                                                                                Updates
                                                                        </MenubarItem>
                                                                        <MenubarItem>
                                                                                <BugIcon className="size-4 mr-2" />
                                                                                Report a problem
                                                                        </MenubarItem>
                                                                </MenubarContent>
                                                        </MenubarMenu>
                                                </Menubar>
                                        </div>
                                </div>
                        </div>
                        <div className="flex items-center gap-4 pl-4">
                                <Avatars />
                                <Inbox />
                                <OrganizationSwitcher
                                        afterCreateOrganizationUrl={'/'}
                                        afterLeaveOrganizationUrl="/"
                                        afterSelectOrganizationUrl={'/'}
                                        afterSelectPersonalUrl={'/'}
                                />
                                <UserButton />
                        </div>
                </nav>
        );
};
