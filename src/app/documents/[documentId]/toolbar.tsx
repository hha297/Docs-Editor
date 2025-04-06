'use client';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
        Bold,
        DeleteIcon,
        Heading1,
        Heading2,
        Heading3,
        ImageIcon,
        Italic,
        Link2,
        ListIcon,
        ListOrderedIcon,
        ListTodoIcon,
        LucideIcon,
        MessageSquarePlusIcon,
        PrinterIcon,
        Redo2Icon,
        RemoveFormattingIcon,
        SpellCheckIcon,
        Strikethrough,
        Underline,
        Undo2Icon,
} from 'lucide-react';
import React from 'react';

interface ToolbarButtonProps {
        icon: LucideIcon;
        isActive?: boolean;
        onClick?: () => void;
}
const ToolbarButton = ({ icon: Icon, isActive, onClick }: ToolbarButtonProps) => {
        return (
                <button
                        className={cn(
                                'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
                                isActive && 'bg-neutral-200/80',
                        )}
                >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} onClick={onClick} />
                </button>
        );
};
export const Toolbar = () => {
        const { editor } = useEditorStore((state) => state);
        const sections: { label: string; icon: LucideIcon; onClick: () => void; isActive?: boolean }[][] = [
                [
                        { label: 'Undo', icon: Undo2Icon, onClick: () => editor?.chain().focus().undo().run() },
                        { label: 'Redo', icon: Redo2Icon, onClick: () => editor?.chain().focus().redo().run() },
                        { label: 'Clear', icon: DeleteIcon, onClick: () => editor?.chain().focus().clearNodes().run() },
                        { label: 'Print', icon: PrinterIcon, onClick: () => window.print() },
                        {
                                label: 'Spell Check',
                                icon: SpellCheckIcon,
                                onClick: () => {
                                        const current = editor?.view.dom.getAttribute('spellcheck');
                                        editor?.view.dom.setAttribute(
                                                'spellcheck',
                                                current === 'true' ? 'false' : 'true',
                                        );
                                },
                        },
                ],
                [
                        {
                                label: 'Bold',
                                icon: Bold,
                                onClick: () => editor?.chain().focus().toggleBold().run(),
                                isActive: editor?.isActive('bold'),
                        },
                        {
                                label: 'Italic',
                                icon: Italic,
                                onClick: () => editor?.chain().focus().toggleItalic().run(),
                                isActive: editor?.isActive('italic'),
                        },

                        {
                                label: 'Underline',
                                icon: Underline,
                                onClick: () => editor?.chain().focus().toggleUnderline().run(),
                                isActive: editor?.isActive('underline'),
                        },
                        {
                                label: 'Strikethrough',
                                icon: Strikethrough,
                                onClick: () => editor?.chain().focus().toggleStrike().run(),
                                isActive: editor?.isActive('strike'),
                        },
                ],

                [
                        { label: 'Comment', icon: MessageSquarePlusIcon, onClick: () => {}, isActive: false },
                        {
                                label: 'Todolist',
                                icon: ListTodoIcon,
                                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                                isActive: editor?.isActive('taskList'),
                        },
                        {
                                label: 'Remove Formatting',
                                icon: RemoveFormattingIcon,
                                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                        },
                ],
        ];
        return (
                <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
                        {sections[0].map((item) => (
                                <ToolbarButton
                                        key={item.label}
                                        icon={item.icon}
                                        isActive={item.isActive}
                                        onClick={item.onClick}
                                />
                        ))}
                        <Separator orientation="vertical" className="mx-2" />
                        {/* TODO: Font Family */}
                        <Separator orientation="vertical" className="mx-2" />
                        {/* TODO: Heading */}
                        <Separator orientation="vertical" className="mx-2" />
                        {/* TODO: Font Size */}
                        {sections[1].map((item) => (
                                <ToolbarButton
                                        key={item.label}
                                        icon={item.icon}
                                        isActive={item.isActive}
                                        onClick={item.onClick}
                                />
                        ))}
                        {/* TODO: Text Color */}
                        {/* TODO: Highlight Color */}
                        <Separator orientation="vertical" className="mx-2" />
                        {/* TODO: Link, Image */}
                        {/* TODO: Align */}
                        {/* TODO: Line Height */}
                        {/* TODO: List */}
                        {sections[2].map((item) => (
                                <ToolbarButton
                                        key={item.label}
                                        icon={item.icon}
                                        isActive={item.isActive}
                                        onClick={item.onClick}
                                />
                        ))}
                </div>
        );
};
